import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAdComponent } from '../google-ad/google-ad.component';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-sticky-ad',
  standalone: true,
  imports: [CommonModule, GoogleAdComponent],
  template: `
    <div class="sticky-ad-wrapper" *ngIf="isVisible">
      <div class="sticky-ad-content">
        <button class="close-btn" (click)="closeAd()" aria-label="Close Ad">×</button>
        <app-google-ad [adSlot]="adSlot" adFormat="horizontal" [fullWidthResponsive]="'false'"
            [customStyle]="{'margin': '0', 'min-height': '60px'}"></app-google-ad>
      </div>
    </div>
  `,
  styles: [`
    .sticky-ad-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: white;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      display: flex;
      justify-content: center;
      padding: 5px 0;
    }
    .sticky-ad-content {
      position: relative;
      width: 100%;
      max-width: 728px;
    }
    .close-btn {
      position: absolute;
      top: -25px;
      right: 5px;
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      z-index: 10000;
      transition: background 0.3s;
    }
    .close-btn:hover {
      background: rgba(0,0,0,0.8);
    }
  `]
})
export class StickyAdComponent implements OnInit {
  @Input() adSlot: string = '';
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
