import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { AdsterraAdComponent } from '../adsterra-ad/adsterra-ad.component';
import { StickyAdComponent } from '../sticky-ad/sticky-ad.component';
import { VideoAdPopupComponent } from '../video-ad-popup/video-ad-popup.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, AdsterraAdComponent, StickyAdComponent, VideoAdPopupComponent],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component implements OnInit, OnDestroy {
  adZones = environment.adsterra;

  // Verification Stages: 'initial', 'processing', 'ready-to-start', 'timer-running', 'verified'
  verifyStage: 'initial' | 'processing' | 'ready-to-start' | 'timer-running' | 'verified' = 'initial';

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
      "Remote Work ROI for Software Engineers", "Digital Nomad EPC Growth in 2026", "Scaling Career Performance Authority (CPA)",
      "High-Yield Remote Project Management", "The Economics of Digital Nomadism", "Career ROI for Remote Product Leads",
      "EPC Trends in Blockchain Careers", "Cybersecurity ROI for Remote Teams", "Sustainability in Remote Work ROI",
      "6G Connectivity and Remote Career Growth", "ROI of Virtual Workspaces in 2026", "Security Best Practices for Remote CPA",
      "Microservices ROI for Remote Developers", "The ROI of Low-Code for Career Growth", "Supply Chain Career ROI in 2026",
      "Management ROI for Autonomous Teams", "Human-Augmented Career Analytics", "Predictive ROI in Remote Sales",
      "Industrial ROI in Remote Manufacturing", "The ROI of AR in Digital Training", "NLP Career Growth and EPC Trends",
      "Serverless ROI for Remote Infrastructure", "Data Literacy ROI for Professionals", "DevOps ROI in the Remote Economy"
    ];

    for (let i = 0; i < topics.length; i++) {
      this.articles.push({
        id: i,
        title: topics[i],
        hindiTitle: this.getHindiTitle(topics[i]),
        content: `As we analyze the trajectory of ${topics[i]}, it becomes evident that the industry is at a critical crossroads. Technical career ROI is projected to surge by 35% in current market conditions.`,
        hindiContent: `जैसे ही हम ${topics[i]} की प्रगति का विश्लेषण करते हैं, यह स्पष्ट हो जाता है कि उद्योग एक महत्वपूर्ण मोड़ पर है। वर्तमान बाजार स्थितियों में तकनीकी कैरियर आरओआई (ROI) में 35% की वृद्धि होने का अनुमान है।`,
        image: `https://picsum.photos/800/400?random=${i + 50}`
      });
    }
  }

  getHindiTitle(topic: string): string {
    const hindiMap: any = {
      "Remote Work ROI for Software Engineers": "सॉफ्टवेयर इंजीनियरों के लिए रिमोट वर्क आरओआई",
      "Digital Nomad EPC Growth in 2026": "2026 में डिजिटल नोमैड ईपीसी वृद्धि",
      "Scaling Career Performance Authority (CPA)": "कैरियर प्रदर्शन अथॉरिटी (CPA) का विस्तार",
      "High-Yield Remote Project Management": "उच्च-उपज रिमोट प्रोजेक्ट मैनेजमेंट",
      "The Economics of Digital Nomadism": "डिजिटल नोमैडिज़्म का अर्थशास्त्र",
      "Career ROI for Remote Product Leads": "रिमोट प्रोडक्ट लीड्स के लिए कैरियर आरओआई",
      "EPC Trends in Blockchain Careers": "ब्लॉकचेन व्यवसायों में ईपीसी रुझान",
      "Cybersecurity ROI for Remote Teams": "रिमोट टीमों के लिए साइबर सुरक्षा आरओआई",
      "Sustainability in Remote Work ROI": "रिमोट वर्क आरओआई में स्थिरता",
      "6G Connectivity and Remote Career Growth": "6G कनेक्टिविटी और रिमोट कैरियर ग्रोथ",
      "ROI of Virtual Workspaces in 2026": "2026 में वर्चुअल वर्कस्पेस का आरओआई",
      "Security Best Practices for Remote CPA": "रिमोट सीपीए के लिए सुरक्षा सर्वोत्तम अभ्यास",
      "Microservices ROI for Remote Developers": "रिमोट डेवलपर्स के लिए माइक्रोसर्विसेज आरओआई",
      "The ROI of Low-Code for Career Growth": "कैरियर ग्रोथ के लिए लो-कोड का आरओआई",
      "Supply Chain Career ROI in 2026": "2026 में सप्लाई चेन कैरियर आरओआई",
      "Management ROI for Autonomous Teams": "स्वायत्त टीमों के लिए प्रबंधन आरओआई",
      "Human-Augmented Career Analytics": "मानव-संवर्धित कैरियर विश्लेषण",
      "Predictive ROI in Remote Sales": "रिमोट सेल्स में प्रेडिक्टिव आरओआई",
      "Industrial ROI in Remote Manufacturing": "रिमोट मैन्युफैक्चरिंग में औद्योगिक आरओआई",
      "The ROI of AR in Digital Training": "डिजिटल प्रशिक्षण में एआर (AR) का आरओआई",
      "NLP Career Growth and EPC Trends": "एनएलपी कैरियर ग्रोथ और ईपीसी रुझान",
      "Serverless ROI for Remote Infrastructure": "रिमोट इंफ्रास्ट्रक्चर के लिए सर्वरलेस आरओआई",
      "Data Literacy ROI for Professionals": "पेशेवरों के लिए डेटा साक्षरता आरओआई",
      "DevOps ROI in the Remote Economy": "रिमोट इकोनॉमी में डेवऑप्स (DevOps) आरओआई"
    };
    return hindiMap[topic] || topic;
  }

  ngOnInit() {
    if (localStorage.getItem('step2_verified') === 'true') {
      this.verifyStage = 'verified';
      this.showContinueBtn = true;
    } else {
      this.verifyStage = 'initial';
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  onStartTimer() {
    this.verifyStage = 'timer-running';
    this.startTimer();
  }

  startTimer() {
    this.timerStarted = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.verifyStage = 'verified';
        this.showContinueBtn = true;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onContinueClick() {
    localStorage.setItem('step2_verified', 'true');
    this.verifyService.completeStep2();
    window.location.href = '/verify/step3';
  }
}
