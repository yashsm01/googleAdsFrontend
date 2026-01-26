import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { GoogleAdComponent } from '../google-ad/google-ad.component';
import { StickyAdComponent } from '../sticky-ad/sticky-ad.component';
import { VideoAdPopupComponent } from '../video-ad-popup/video-ad-popup.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, GoogleAdComponent, StickyAdComponent, VideoAdPopupComponent],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component implements OnInit, OnDestroy {
  adSlots = environment.adSlots;
  timeLeft = 15;
  timerStarted = false;
  showContinueBtn = false;
  interval: any;

  // Massive content generation
  articles: any[] = [];

  constructor(private router: Router, private verifyService: VerifyService) {
    this.generateMassiveContent();
  }

  generateMassiveContent() {
    const topics = [
      "Artificial Intelligence Ethics", "Next-Gen Cloud Infrastructure", "Cyber Security in 2026",
      "The Rise of Decentralized AI", "Quantum Networking Principles", "Advanced Data Privacy Laws",
      "Edge Computing Use Cases", "Biometric Authentication Trends", "Sustainable Software Engineering",
      "The Impact of 6G Technology", "Digital Workspace Transformation", "API Security Best Practices",
      "Microservices Architecture Evolution", "The Future of Low-Code Platforms", "Blockchain for Supply Chain",
      "Autonomous Systems Management", "Human-Augmented Intelligence", "Predictive Analytics in Retail",
      "Smart Manufacturing Frameworks", "The Role of AR in Engineering", "Natural Language Processing Trends",
      "Serverless Computing Performance", "Data Literacy for the Masses", "The Evolution of DevOps Culture"
    ];

    for (let i = 0; i < topics.length; i++) {
      this.articles.push({
        id: i,
        title: topics[i],
        content: `As we analyze the trajectory of ${topics[i]}, it becomes evident that the industry is at a critical crossroads. The convergence of multiple technological streams is creating new possibilities that were previously unimaginable. Our research indicates that the primary drivers of this change are increased computational efficiency and the widespread availability of high-speed connectivity. In this detailed exploration, we look at the specific technical requirements for implementation and the long-term benefits for enterprises that adopt these solutions early. We also address the common challenges and pitfalls that teams encounter during the migration process.`,
        image: `https://picsum.photos/800/400?random=${i + 50}`
      });
    }
  }

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
    window.location.href = '/verify/step3';
  }
}
