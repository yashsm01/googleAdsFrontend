import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyService } from '../../services/verify.service';
import { AdsterraAdComponent } from '../adsterra-ad/adsterra-ad.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step4',
  standalone: true,
  imports: [CommonModule, AdsterraAdComponent],
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.css'
})
export class Step4Component implements OnInit, OnDestroy {
  adZones = environment.adsterra;
  botData: any;
  timeLeft = 15;
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
    // Open Adsterra Smartlink in a new window/tab to ensure ad visibility
    if (this.adZones.smartlink) {
      window.open(this.adZones.smartlink, '_blank');
    }

    // Redirect the main window to the final Telegram destination
    if (this.botData && this.botData.verify_url) {
      window.location.href = this.botData.verify_url;
    } else if (this.botData && this.botData.bot_username) {
      window.location.href = `https://t.me/${this.botData.bot_username}`;
    }
  }
}
