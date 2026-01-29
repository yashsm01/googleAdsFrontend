import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-ad-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-overlay" *ngIf="isVisible" (click)="onAdClick()">
      <div class="video-modal" (click)="$event.stopPropagation()">
        <div class="video-header">
          <span class="outfit" style="color: #4ade80;">Handshake Sponsored: Career ROI Analysis</span>
          <button class="skip-btn" [disabled]="skipCountdown > 0" (click)="closeAd($event)">
            {{ skipCountdown > 0 ? 'Skip in ' + skipCountdown + 's' : 'SKIP AD' }}
          </button>
        </div>
        <div class="video-content-area" (click)="onAdClick()">
          <img src="assets/career_roi_video_thumbnail.png" alt="Career ROI Analysis Video" class="ad-image">
          <div class="play-overlay">
            <div class="play-button"></div>
          </div>
        </div>
        <div class="video-footer">
           <p class="outfit">Unlock elite career authority metrics. Click to sync results.</p>
           <button class="btn-learn-more" (click)="onAdClick()">SYNC MY ROI NOW →</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.92);
      z-index: 20000;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
    }
    .video-modal {
      width: 95%;
      max-width: 500px;
      background: #0a0a0a;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(0,0,0,0.5), 0 0 20px rgba(74, 222, 128, 0.2);
      border: 1px solid rgba(255,255,255,0.1);
      animation: modalSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .video-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #141414;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .skip-btn {
      background: rgba(255,255,255,0.1);
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .skip-btn:hover:not(:disabled) {
      background: #ef4444;
      border-color: #ef4444;
      color: white;
    }
    .skip-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .video-content-area {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: black;
      cursor: pointer;
      overflow: hidden;
    }
    .ad-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
    .video-content-area:hover .ad-image {
      transform: scale(1.05);
    }
    .play-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.2);
    }
    .play-button {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.9);
      border-radius: 50%;
      position: relative;
      box-shadow: 0 0 30px rgba(0,0,0,0.5);
    }
    .play-button::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 55%;
      transform: translate(-50%, -50%);
      border-left: 25px solid black;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    }
    .video-footer {
      padding: 24px;
      text-align: center;
      background: linear-gradient(to bottom, #141414, #0a0a0a);
    }
    .video-footer p {
      color: #999;
      margin-bottom: 20px;
      font-size: 0.95rem;
    }
    .btn-learn-more {
      background: #4ade80;
      color: #052e16;
      border: none;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 800;
      width: 100%;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
    }
    .btn-learn-more:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
      background: #22c55e;
    }
    @keyframes modalSlide {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `]
})
export class VideoAdPopupComponent implements OnInit, OnDestroy {
  @Input() delay: number = 0;
  @Output() closed = new EventEmitter<void>();

  isVisible = false;
  skipCountdown = 7;
  private interval: any;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      this.startCountdown();
    }, this.delay);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.skipCountdown > 0) {
        this.skipCountdown--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  onAdClick() {
    // Replace with your actual PropellerAds (Monetag) Direct Link
    window.open('https://your-direct-link-here.com', '_blank');
    this.closeAd();
  }

  closeAd(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isVisible = false;
    this.closed.emit();
  }
}
