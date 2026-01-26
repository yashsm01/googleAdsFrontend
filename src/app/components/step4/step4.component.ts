import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyService } from '../../services/verify.service';

@Component({
  selector: 'app-step4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.css'
})
export class Step4Component implements OnInit, OnDestroy {
  botData: any;
  timeLeft = 5;
  interval: any;

  constructor(private verifyService: VerifyService) { }

  ngOnInit() {
    this.botData = this.verifyService.getBotData();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) { // Faster 1s countdown for Step 4
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.redirectToTelegram();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  redirectToTelegram() {
    if (this.botData && this.botData.verify_url) {
      window.location.href = this.botData.verify_url;
    } else if (this.botData && this.botData.bot_username) {
      window.location.href = `https://t.me/${this.botData.bot_username}`;
    }
  }
}
