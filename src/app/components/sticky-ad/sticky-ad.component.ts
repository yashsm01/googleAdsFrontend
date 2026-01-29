import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsterraAdComponent } from '../adsterra-ad/adsterra-ad.component';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-sticky-ad',
  standalone: true,
  imports: [CommonModule, AdsterraAdComponent],
  template: `
    <div class="sticky-ad-wrapper" *ngIf="isVisible">
      <div class="sticky-ad-content">
        <button class="close-btn" (click)="closeAd()" aria-label="Close Ad">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
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
      height: 40vh;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      border-top: 1px solid rgba(0,0,0,0.05);
    }
    .sticky-ad-content {
      position: relative;
      width: 100%;
      max-width: 800px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close-btn {
      position: absolute;
      top: -12px; /* Half of 24px */
      right: 20px;
      background: #1a1a1b;
      color: white;
      border: 2.5px solid white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10001;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .close-btn:hover {
      background: #ef4444;
      transform: scale(1.1) rotate(90deg);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }
    .close-btn:active {
      transform: scale(0.9);
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

  closeAd() {
    this.isVisible = false;
  }
}
