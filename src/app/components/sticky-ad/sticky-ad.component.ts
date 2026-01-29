import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsterraAdComponent } from '../adsterra-ad/adsterra-ad.component';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-sticky-ad',
  standalone: true,
  imports: [CommonModule, AdsterraAdComponent],
  template: `
    <div class="sticky-ad-wrapper" *ngIf="isVisible" (click)="onAdContentClick()">
      <button class="close-btn" (click)="closeAd($event)" aria-label="Close Ad">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="sticky-ad-content" (click)="$event.stopPropagation()">
        <app-adsterra-ad [adKey]="adKey"
            [customStyle]="{'margin': '0', 'min-height': '60px'}"></app-adsterra-ad>
      </div>
    </div>
  `,
  styles: [`
    .sticky-ad-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      min-height: 80px;
      background: white;
      box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px;
      border-top: 3px solid var(--primary-color);
      animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .sticky-ad-content {
      width: 100%;
      max-width: 728px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close-btn {
      position: absolute;
      top: -18px;
      right: 15px;
      background: #ef4444;
      color: white;
      border: 2px solid white;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10001;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
      transition: all 0.2s;
    }
    .close-btn:hover {
      transform: scale(1.1) rotate(90deg);
      background: #dc2626;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `]
})
export class StickyAdComponent implements OnInit {
  @Input() adKey: string = '';
  isVisible = false;

  ngOnInit() {
    // Show after 1 second for attention
    setTimeout(() => {
      this.isVisible = true;
    }, 1000);
  }

  closeAd(event: Event) {
    event.stopPropagation();
    this.isVisible = false;
  }

  onAdContentClick() {
    // This provides a backup click area that opens the smartlink
    // but the Adsterra component usually handles this inside its iframe
  }
}
