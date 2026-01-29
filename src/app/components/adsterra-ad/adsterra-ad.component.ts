import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-adsterra-ad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-outer-wrapper" [ngStyle]="customStyle" [class.collapsed]="isError">
      <div *ngIf="isLoading" class="ad-placeholder">
        <div class="shimmer"></div>
        <div class="placeholder-content">
          <span class="outfit">Syncing Market ROI Data...</span>
        </div>
      </div>
      <div class="ad-container" [class.hidden]="isLoading || isError">
        <div [id]="containerId"></div>
      </div>
    </div>
  `,
  styles: [`
    .ad-outer-wrapper {
      margin: 1rem 0;
      min-height: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.5s ease;
    }
    .ad-outer-wrapper.collapsed {
      margin: 0;
      min-height: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }
    .ad-placeholder {
      width: 100%;
      height: 90px;
      max-width: 728px;
      background: #f8fafc;
      border: 1px dashed #e2e8f0;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .placeholder-content {
      position: relative;
      z-index: 2;
      color: #94a3b8;
      font-size: 0.9rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .shimmer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 2s infinite;
      z-index: 1;
    }
    .ad-container {
      width: 100%;
      display: flex;
      justify-content: center;
      transition: opacity 0.3s ease;
    }
    .ad-container.hidden {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `]
})
export class AdsterraAdComponent implements AfterViewInit {
  @Input() adKey: string = environment.adsterra.banner;
  @Input() format: 'banner' | 'native' = 'banner';
  @Input() customStyle: any = {};

  isLoading = true;
  isError = false;
  // Generate a unique ID for this specific component instance
  uniqueId = Math.random().toString(36).substring(2, 11);

  get containerId(): string {
    return `ad-${this.format}-${this.adKey}-${this.uniqueId}`;
  }

  ngAfterViewInit() {
    this.injectAdScript();

    // Safety timeout: if ad doesn't load in 5s, consider it blocked/failed
    setTimeout(() => {
      this.checkLoadState();
    }, 5000);
  }

  private injectAdScript() {
    try {
      const container = document.getElementById(this.containerId);
      if (!container) {
        this.handleError();
        return;
      }

      if (this.format === 'banner') {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        // We use a temporary global options object for the banner
        // In a real multi-ad scenario, this might need more isolation
        (window as any).atOptions = {
          'key': this.adKey,
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
        script.src = `//www.highperformanceformat.com/${this.adKey}/invoke.js`;
        script.onload = () => { this.isLoading = false; };
        script.onerror = () => { this.handleError(); };
        container.appendChild(script);
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `//pl28600090.effectivegatecpm.com/${this.adKey}/invoke.js`;
        script.onload = () => { this.isLoading = false; };
        script.onerror = () => { this.handleError(); };
        container.appendChild(script);
      }
    } catch (e) {
      this.handleError();
    }
  }

  private handleError() {
    this.isError = true;
    this.isLoading = false;
  }

  private checkLoadState() {
    if (this.isLoading) {
      const container = document.getElementById(this.containerId);

      // If container is still empty after 5s, it's likely blocked by AdBlock or fail
      // We check for both empty innerHTML or just the script tag being the only child
      if (container && (container.innerHTML.trim() === '' || container.children.length === 1 && container.firstChild?.nodeName === 'SCRIPT')) {
        // Note: Some ads might take longer, but 5s is a reasonable cutoff for shimmer removal
        if (container.innerHTML.trim() === '') {
          this.handleError();
        } else {
          // If there is content but still loading, don't necessarily error out
          // but let's assume it's loading if we see progress
        }
      }
    }
  }
}
