import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component implements OnInit, OnDestroy {
  timeLeft = 8;
  showGetLinkBtn = false;
  isVerifying = false;
  isSuccess = false;
  error: string | null = null;
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
    const code = this.verifyService.getVerificationCode();
    if (!code) {
      this.error = "Verification code missing. Please restart the process.";
      return;
    }

    this.isVerifying = true;
    this.error = null;

    this.verifyService.grantAccess(code).subscribe({
      next: (res) => {
        if (res.status === 'success' && res.data) {
          this.isSuccess = true;
          this.isVerifying = false;

          // Store bot data for the final page
          this.verifyService.setBotData(res.data);

          // Show success bubble for 1s before navigating to Step 4
          setTimeout(() => {
            window.location.href = '/verify/step4';
          }, 1000);
        } else {
          this.error = res.message || "Failed to grant access. Please try again.";
          this.isVerifying = false;
        }
      },
      error: (err) => {
        console.error('Final API Error:', err);
        // Special case: if localhost 8000 is not running, I'll mock success for demo if needed,
        // but for now I'll show error as expected in real usage.
        this.error = "Server error or connection failed. Please ensure the backend is running.";
        this.isVerifying = false;
      }
    });
  }
}
