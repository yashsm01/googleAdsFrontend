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
        hindiTitle: this.getHindiTitle(topics[i]),
        content: `Detailed research into ${topics[i]} has revealed fascinating new insights. Experts suggest that by 2030, the adoption of these technologies will be near-universal.`,
        hindiContent: `${topics[i]} में शोध ने आकर्षक नई अंतर्दृष्टि का खुलासा किया है। विशेषज्ञों का सुझाव है कि 2030 तक इन तकनीकों को अपनाने की संभावना है।`,
        image: `https://picsum.photos/800/400?random=${i + 10}`
      });
    }
  }

  getHindiTitle(topic: string): string {
    const hindiMap: any = {
      "Quantum Computing Breakthroughs": "क्वांटम कंप्यूटिंग की नई खोज",
      "The Ethical Dilemma of AGI": "एजीआई (AGI) की नैतिक दुविधा",
      "Web3: Decentralizing the Internet": "वेब3: इंटरनेट का विकेंद्रीकरण",
      "Biotech and Longevity": "बायोटेक और दीर्घायु",
      "Sustainable Energy in 2026": "2026 में स्थायी ऊर्जा",
      "Space Tourism: The New Frontier": "अंतरिक्ष पर्यटन: नया क्षितिज",
      "Neuro-Link Interface Evolution": "न्यूरो-लिंक इंटरफेस का विकास",
      "The Future of Smart Cities": "स्मार्ट शहरों का भविष्य",
      "Cyber-Physical System Security": "साइबर-फिजिकल सिस्टम की सुरक्षा",
      "Advanced Robotics in Modern Medicine": "आधुनिक चिकित्सा में उन्नत रोबोटिक्स",
      "Hyperloop: Revolutionizing Transit": "हाइपरलूप: परिवहन में क्रांति",
      "The Virtual Reality Workplace": "वर्चुअल रियलिटी कार्यक्षेत्र",
      "Digital Twins in Manufacturing": "विनिर्माण में डिजिटल जुड़वां (Digital Twins)",
      "Synthetic Biology and Global Health": "सिंथेटिक बायोलॉजी और वैश्विक स्वास्थ्य",
      "Privacy in the Age of Surveillance": "निगरानी के युग में गोपनीयता",
      "Nanotechnology and Material Science": "नैनो टेक्नोलॉजी और सामग्री विज्ञान",
      "The Economics of Space Mining": "अंतरिक्ष खनन का अर्थशास्त्र",
      "Renewable Energy Grids": "नवीकरणीय ऊर्जा ग्रिड",
      "Algorithmic Governance": "एल्गोरिदमिक शासन",
      "The Philosophy of Digital Existence": "डिजिटल अस्तित्व का दर्शन",
      "Post-Quantum Cryptography": "पोस्ट-क्वांटम क्रिप्टोग्राफी",
      "Green Architecture Innovations": "हरित वास्तुकला नवाचार",
      "The Social Impact of Automation": "स्वचालन का सामाजिक प्रभाव",
      "Decentralized Autonomous Organizations": "विकेंद्रीकृत स्वायत्त संगठन (DAO)"
    };
    return hindiMap[topic] || topic;
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
