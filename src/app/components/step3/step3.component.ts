import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { AdsterraAdComponent } from '../adsterra-ad/adsterra-ad.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, AdsterraAdComponent],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component implements OnInit, OnDestroy {
  adZones = environment.adsterra;
  timeLeft = 8;
  showGetLinkBtn = false;
  isVerifying = false;
  isSuccess = false;
  error: string | null = null;
  isTyping = true;
  interval: any;

  constructor(
    private router: Router,
    private verifyService: VerifyService
  ) { }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.showGetLinkBtn = true;
        this.isTyping = false;
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onGetLink() {
    console.log('[DEBUG] GET LINK clicked');
    this.error = null;

    const code = this.verifyService.getVerificationCode() || localStorage.getItem('verification_code');
    console.log('[DEBUG] Code from service/local:', code);

    if (!code) {
      this.error = "ERROR: No verification code found! Please restart from Step 1. (त्रुटि: कोई कोड नहीं मिला!)";
      console.error('[DEBUG] Aborting: No code found in signal or localStorage');
      this.isVerifying = false;
      return;
    }

    if (this.isVerifying) {
      console.warn('[DEBUG] Already verifying, ignoring click.');
      return;
    }

    this.isVerifying = true;
    console.log('[DEBUG] isVerifying set to true. Calling API:', this.verifyService['apiUrl']);

    this.verifyService.grantAccess(code).subscribe({
      next: (res) => {
        console.log('[DEBUG] API Response Received:', res);
        if (res.status === 'success' || res.ok) {
          this.isSuccess = true;
          if (res.data) this.verifyService.setBotData(res.data);
          setTimeout(() => window.location.href = '/verify/step4', 1500);
        } else {
          this.error = res.message || "Authorization failed. Please try again.";
          this.isVerifying = false;
        }
      },
      error: (err) => {
        console.error('[DEBUG] API Call Failed:', err);
        this.isVerifying = false;
        if (err.status === 0) {
          this.error = "Handshake Error: Network connectivity issue or Backend Offline.";
        } else {
          this.error = `Handshake Error (${err.status}): ${err.message || 'Server rejected request'}`;
        }
      }
    });
  }
}
