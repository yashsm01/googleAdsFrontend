import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-adsterra-ad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-container" [ngStyle]="customStyle">
      <div [id]="format === 'native' ? 'container-' + adKey : 'adsterra-key-' + adKey"></div>
    </div>
  `,
  styles: [`
    .ad-container {
      margin: 1.5rem 0;
      min-height: 100px;
      overflow: hidden;
      display: flex;
      justify-content: center;
    }
  `]
})
export class AdsterraAdComponent implements AfterViewInit {
  @Input() adKey: string = environment.adsterra.banner;
  @Input() format: 'banner' | 'native' = 'banner';
  @Input() customStyle: any = {};

  ngAfterViewInit() {
    this.injectAdScript();
  }

  private injectAdScript() {
    try {
      // For Native widgets, Adsterra looks for 'container-[key]'
      // For standard banners, we use our own ID mapping
      const containerId = this.format === 'native'
        ? 'container-' + this.adKey
        : 'adsterra-key-' + this.adKey;

      const container = document.getElementById(containerId);
      if (!container) return;

      if (this.format === 'banner') {
        (window as any).atOptions = {
          'key': this.adKey,
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//www.highperformanceformat.com/${this.adKey}/invoke.js`;
        container.appendChild(script);
      } else {
        // Native / Social Bar / Widget Layout
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `//pl28600090.effectivegatecpm.com/${this.adKey}/invoke.js`;
        container.appendChild(script);
      }
    } catch (e) {
      console.error('Adsterra initialization error', e);
    }
  }
}
