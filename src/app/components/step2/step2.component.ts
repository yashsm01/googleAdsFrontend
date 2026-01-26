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
        hindiTitle: this.getHindiTitle(topics[i]),
        content: `As we analyze the trajectory of ${topics[i]}, it becomes evident that the industry is at a critical crossroads. The convergence of multiple technological streams is creating new possibilities.`,
        hindiContent: `जैसे ही हम ${topics[i]} की प्रगति का विश्लेषण करते हैं, यह स्पष्ट हो जाता है कि उद्योग एक महत्वपूर्ण मोड़ पर है। कई तकनीकी धाराओं का संगम नई संभावनाएं पैदा कर रहा है।`,
        image: `https://picsum.photos/800/400?random=${i + 50}`
      });
    }
  }

  getHindiTitle(topic: string): string {
    const hindiMap: any = {
      "Artificial Intelligence Ethics": "आर्टिफिशियल इंटेलिजेंस नैतिकता",
      "Next-Gen Cloud Infrastructure": "अगली पीढ़ी का क्लाउड इंफ्रास्ट्रक्चर",
      "Cyber Security in 2026": "2026 में साइबर सुरक्षा",
      "The Rise of Decentralized AI": "विकेंद्रीकृत एआई का उदय",
      "Quantum Networking Principles": "क्वांटम नेटवर्किंग के सिद्धांत",
      "Advanced Data Privacy Laws": "उन्नत डेटा गोपनीयता कानून",
      "Edge Computing Use Cases": "एज कंप्यूटिंग के उपयोग के मामले",
      "Biometric Authentication Trends": "बायोमेट्रिक प्रमाणीकरण रुझान",
      "Sustainable Software Engineering": "सतत सॉफ्टवेयर इंजीनियरिंग",
      "The Impact of 6G Technology": "6G तकनीक का प्रभाव",
      "Digital Workspace Transformation": "डिजिटल कार्यक्षेत्र परिवर्तन",
      "API Security Best Practices": "एपीआई सुरक्षा सर्वोत्तम अभ्यास",
      "Microservices Architecture Evolution": "माइक्रोसर्विसेज आर्किटेक्चर का विकास",
      "The Future of Low-Code Platforms": "लो-कोड प्लेटफॉर्म का भविष्य",
      "Blockchain for Supply Chain": "सप्लाई चेन के लिए ब्लॉकचेन",
      "Autonomous Systems Management": "स्वायत्त प्रणालियों का प्रबंधन",
      "Human-Augmented Intelligence": "मानव-संवर्धित बुद्धिमत्ता",
      "Predictive Analytics in Retail": "रिटेल में भविष्य कहनेवाला विश्लेषण",
      "Smart Manufacturing Frameworks": "स्मार्ट विनिर्माण ढांचे",
      "The Role of AR in Engineering": "इंजीनियरिंग में एआर की भूमिका",
      "Natural Language Processing Trends": "नेचुरल लैंग्वेज प्रोसेसिंग रुझान",
      "Serverless Computing Performance": "सर्वरलेस कंप्यूटिंग प्रदर्शन",
      "Data Literacy for the Masses": "जनता के लिए डेटा साक्षरता",
      "The Evolution of DevOps Culture": "डेवऑप्स (DevOps) संस्कृति का विकास"
    };
    return hindiMap[topic] || topic;
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
