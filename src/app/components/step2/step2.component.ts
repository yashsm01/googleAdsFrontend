import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component implements OnInit, OnDestroy {
  timeLeft = 15;
  timerStarted = false;
  showContinueBtn = false;
  interval: any;

  constructor(private router: Router, private verifyService: VerifyService) { }

  ngOnInit() {
    if (localStorage.getItem('step2_countdown_started') === 'true') {
      this.timerStarted = true;
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  onStartCount() {
    // Save state and reload to maximize ad revenue
    localStorage.setItem('step2_countdown_started', 'true');
    window.location.reload();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.showContinueBtn = true;
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onContinueClick() {
    this.verifyService.completeStep2();
    // Navigate to next page with a hard refresh
    window.location.href = '/verify/step3';
  }
}
