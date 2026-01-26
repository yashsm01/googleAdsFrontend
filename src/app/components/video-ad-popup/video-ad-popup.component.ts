import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-ad-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-overlay" *ngIf="isVisible">
      <div class="video-modal">
        <div class="video-header">
          <span>Sponsored Content</span>
          <button class="skip-btn" [disabled]="skipCountdown > 0" (click)="closeAd()">
            {{ skipCountdown > 0 ? 'Skip in ' + skipCountdown + 's' : 'SKIP VIDEO' }}
          </button>
        </div>
        <div class="video-placeholder">
          <div class="spinner"></div>
          <p>Loading High Quality Video...</p>
          <div class="mock-video-content">
             <!-- This would be an iframe or video tag in production -->
             <div class="ad-pulse"></div>
          </div>
        </div>
        <div class="video-footer">
           <p>Don't miss out! Click to learn more about the future of tech.</p>
           <button class="btn-learn-more">Learn More</button>
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
      background: rgba(0,0,0,0.9);
      z-index: 20000;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
    }
    .video-modal {
      width: 90%;
      max-width: 600px;
      background: #1a1a1a;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0,255,150,0.2);
    }
    .video-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #222;
      color: #ccc;
      font-size: 14px;
    }
    .skip-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
    }
    .skip-btn:disabled {
      background: #444;
      cursor: not-allowed;
    }
    .video-placeholder {
      height: 300px;
      background: black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
      position: relative;
    }
    .mock-video-content {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #111 25%, #222 50%, #111 75%);
      background-size: 200% 200%;
      animation: gradientBg 3s ease infinite;
    }
    .ad-pulse {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 3px solid var(--primary);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    .video-footer {
      padding: 20px;
      text-align: center;
      color: white;
    }
    .btn-learn-more {
      background: white;
      color: black;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      margin-top: 10px;
      cursor: pointer;
    }
    @keyframes gradientBg {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes pulse {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
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

  closeAd() {
    this.isVisible = false;
    this.closed.emit();
  }
}
