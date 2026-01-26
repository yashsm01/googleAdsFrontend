import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { GoogleAdComponent } from '../google-ad/google-ad.component';
import { StickyAdComponent } from '../sticky-ad/sticky-ad.component';
import { VideoAdPopupComponent } from '../video-ad-popup/video-ad-popup.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, GoogleAdComponent, StickyAdComponent, VideoAdPopupComponent],
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

  // Massive content generation
  articles: any[] = [];

  constructor(private router: Router, private verifyService: VerifyService) {
    this.generateMassiveContent();
  }

  generateMassiveContent() {
    const topics = [
      "Quantum Computing Breakthroughs", "The Ethical Dilemma of AGI", "Web3: Decentralizing the Internet",
      "Biotech and Longevity", "Sustainable Energy in 2026", "Space Tourism: The New Frontier",
      "Neuro-Link Interface Evolution", "The Future of Smart Cities", "Cyber-Physical System Security",
      "Advanced Robotics in Modern Medicine", "Hyperloop: Revolutionizing Transit", "The Virtual Reality Workplace",
      "Digital Twins in Manufacturing", "Synthetic Biology and Global Health", "Privacy in the Age of Surveillance",
      "Nanotechnology and Material Science", "The Economics of Space Mining", "Renewable Energy Grids",
      "Algorithmic Governance", "The Philosophy of Digital Existence", "Post-Quantum Cryptography",
      "Green Architecture Innovations", "The Social Impact of Automation", "Decentralized Autonomous Organizations"
    ];

    for (let i = 0; i < topics.length; i++) {
      this.articles.push({
        id: i,
        title: topics[i],
        content: `Detailed research into ${topics[i]} has revealed fascinating new insights. As we move into the second half of the decade, the implications of these developments for society are becoming clearer. Experts suggest that by 2030, the adoption of these technologies will be near-universal, altering how we interact with the physical and digital world. This transformation is driven by a combination of market forces, technological readiness, and a global demand for more efficient and sustainable systems. In the following sections, we will explore the core pillars of this movement and how it affects various industrial sectors from finance to agriculture.`,
        image: `https://picsum.photos/800/400?random=${i + 10}`
      });
    }
  }

  ngOnInit() {
    if (localStorage.getItem('step1_verified') === 'true') {
      this.showVerifyBtn = false;
      this.showContinueBtn = true;
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
    localStorage.setItem('step1_verified', 'true');
    window.location.reload();
  }

  onContinueClick() {
    this.verifyService.completeStep1();
    window.location.href = '/verify/step2';
  }
}
