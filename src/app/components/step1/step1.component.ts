import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { GoogleAdComponent } from '../google-ad/google-ad.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, GoogleAdComponent],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component implements OnInit, OnDestroy {
  adSlots = environment.adSlots;
  timeLeft = 15;
  timerStarted = false;
  showVerifyBtn = false;
  showContinueBtn = false;
  interval: any;

  constructor(private router: Router, private verifyService: VerifyService) { }

  ngOnInit() {
    if (localStorage.getItem('step1_verified') === 'true') {
      this.showVerifyBtn = false;
      this.showContinueBtn = true;
      // Scroll to bottom after a short delay to show the unlocked button
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 500);
    } else {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timerStarted = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.showVerifyBtn = true;
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onVerifyClick() {
    // Save state and reload to maximize ad revenue
    localStorage.setItem('step1_verified', 'true');
    window.location.reload();
  }

  onContinueClick() {
    this.verifyService.completeStep1();
    // Move to next page with a hard refresh
    window.location.href = '/verify/step2';
  }
}
