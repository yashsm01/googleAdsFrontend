import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyService } from '../../services/verify.service';
import { AdsterraAdComponent } from '../adsterra-ad/adsterra-ad.component';
import { StickyAdComponent } from '../sticky-ad/sticky-ad.component';
import { VideoAdPopupComponent } from '../video-ad-popup/video-ad-popup.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, AdsterraAdComponent, StickyAdComponent, VideoAdPopupComponent],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component implements OnInit, OnDestroy {
  adZones = environment.adsterra;
  timeLeft = 15;
  timerStarted = false;
  showVerifyBtn = false;
  showContinueBtn = false;
  interval: any;

  // Real Job Listings from SerpApi
  jobs: any[] = [
    {
      title: "Barista",
      company: "Resto'lution",
      location: "India",
      via: "Indeed",
      salary: "₹22,000–₹26,000 per month",
      description: "Prepare and serve a variety of coffee, track inventory, and handle cash transactions. Good communication skills preferred.",
      thumbnail: "https://picsum.photos/100/100?random=1",
      applyLink: "https://in.indeed.com/viewjob?jk=f497a5b8732ce26e"
    },
    {
      title: "Coffee Shop Barista",
      company: "Tata Starbucks Private Limited",
      location: "India",
      via: "Apna Jobs",
      salary: "Competitive",
      description: "Provide legendary customer service, prepare quality beverages, and maintain a clean store environment. TATA Starbucks principles apply.",
      thumbnail: "https://serpapi.com/searches/6979cb7a99d5f409308533ed/images/d1f0b372e24445bacfb9b838ce0db35cb280c7c59489af15680397b80eaff7db.jpeg",
      applyLink: "https://apna.co/job/mysore/barista-1969031475"
    },
    {
      title: "Barista/All Rounder",
      company: "Cascara Coffee India",
      location: "India",
      via: "SimplyHired",
      salary: "₹15,501–₹18,000 per month",
      description: "Crafting exceptional coffee, maintaining organization, and collaborating with a fast-paced team. Passion for coffee required.",
      thumbnail: "https://picsum.photos/100/100?random=2",
      applyLink: "https://www.simplyhired.co.in/job/AoIcDHEEgKxNWdkEactzXkJOsvwpdW5Sf_qpTNRUIKXUo4oCLfsr_w"
    },
    {
      title: "Specialty Coffee Barista",
      company: "Bruno's Cafe",
      location: "Jalandhar",
      via: "Shine",
      salary: "Professional Grade",
      description: "3+ years experience required. Deep knowledge of specialty coffee, latte art, and inventory management in a premium setting.",
      thumbnail: "https://picsum.photos/100/100?random=3",
      applyLink: "https://www.shine.com/jobs/specialty-coffee-barista/brunos-cafe/18318610"
    },
    {
      title: "Coffee Barista",
      company: "COFFEECO INDIA PVT LTD",
      location: "India",
      via: "Glassdoor",
      salary: "₹18,000–₹25,000 per month",
      description: "Preparing hot/cold drinks, sanitizing work areas, and processing customer payments. Shift: 10:30 AM to 7:30 PM.",
      thumbnail: "https://picsum.photos/100/100?random=4",
      applyLink: "https://www.glassdoor.co.in/job-listing/coffee-barista-coffeeco-india-pvt-ltd-JV_KO0,14_KE15,37.htm?jl=1009959285041"
    }
  ];

  // AdSense Compliance Content
  safetyTips = [
    { title: "Never Pay for a Job", content: "Legitimate employers will never ask for payment for 'processing', 'uniforms', or 'security deposits' during the recruitment phase." },
    { title: "Verify via Official Channels", content: "Always cross-check job listings on the official LinkedIn or career portal of the company mentioning the role." },
    { title: "Protect Personal Data", content: "Do not share sensitive information like bank details or Aadhaar numbers until you have a signed offer letter from a verified corporate entity." }
  ];

  faqData = [
    { q: "Is this an official job portal?", a: "No, this is a technical analysis blog. We provide market insights and curate sample openings to help job seekers understand current trends." },
    { q: "How often are trends updated?", a: "Our technical reports and market data are reviewed weekly to ensure alignment with fiscal quarters and industry shifts." },
    { q: "Do you charge any fees?", a: "Absolutely not. This blog is a free educational resource powered by market analysis and research." }
  ];

  // Massive content generation
  articles: any[] = [];

  constructor(private router: Router, public verifyService: VerifyService) {
    this.generateMassiveContent();
  }

  generateMassiveContent() {
    const topics = [
      "AI-Assisted Remote Architecture ROI", "Digital Arbitrage Career Paths 2026", "The EPC Model in Modern Recruitment",
      "Career Performance Authority (CPA) Trends", "Technical Content Arbitrage Opportunities", "Quantum Recruitment Algorithms",
      "Global Labor ROI Analytics", "The Ethics of AI Job Displacement", "Niche Skill Arbitrage in Tech",
      "Return on Education (ROE) in 2026", "High-Yield Freelance EPC Models", "Career Market Multiplier Effects",
      "Decentralized Career Verification ROI", "The CPA Impact of Professional Branding", "Global Tech Arbitrage Wage Gaps",
      "ROI of Specialized Technical Certifications", "The Future of Digital Sales EPC", "Market Saturation and Career ROI",
      "Career Arbitrage in Developing Economies", "The Return on Investment of Soft Skills", "Technical Recruitment ROI Metrics",
      "EPC Growth in Cybersecurity Careers", "CPA Optimization for Senior Developers", "The Job Market's EPC Frontier"
    ];

    for (let i = 0; i < topics.length; i++) {
      this.articles.push({
        id: i,
        title: topics[i],
        hindiTitle: this.getHindiTitle(topics[i]),
        content: `Comprehensive technical deep-dive into ${topics[i]} has revealed fascitating ROI potential. Advanced market analysis suggests a 40% growth in career authority by late 2026.`,
        hindiContent: `${topics[i]} में गहन तकनीकी विश्लेषण ने आकर्षक आरओआई (ROI) क्षमता का खुलासा किया है। उन्नत बाज़ार विश्लेषण 2026 के अंत तक कैरियर अथॉरिटी में 40% वृद्धि का सुझाव देता है।`,
        image: `https://picsum.photos/800/400?random=${i + 10}`
      });
    }
  }

  getHindiTitle(topic: string): string {
    const hindiMap: any = {
      "AI-Assisted Remote Architecture ROI": "AI-सहायता प्राप्त रिमोट आर्किटेक्चर आरओआई",
      "Digital Arbitrage Career Paths 2026": "डिजिटल आर्बिट्रेज कैरियर पथ 2026",
      "The EPC Model in Modern Recruitment": "आधुनिक भर्ती में ईपीसी (EPC) मॉडल",
      "Career Performance Authority (CPA) Trends": "कैरियर प्रदर्शन अथॉरिटी (CPA) रुझान",
      "Technical Content Arbitrage Opportunities": "तकनीकी सामग्री आर्बिट्रेज के अवसर",
      "Quantum Recruitment Algorithms": "क्वांटम भर्ती एल्गोरिदम",
      "Global Labor ROI Analytics": "वैश्विक श्रम आरओआई विश्लेषण",
      "The Ethics of AI Job Displacement": "एआई जॉब डिस्प्लेसमेंट की नैतिकता",
      "Niche Skill Arbitrage in Tech": "टेक में आला कौशल (Niche Skill) आर्बिट्रेज",
      "Return on Education (ROE) in 2026": "2026 में शिक्षा पर रिटर्न (ROE)",
      "High-Yield Freelance EPC Models": "उच्च-उपज फ्रीलांस ईपीसी मॉडल",
      "Career Market Multiplier Effects": "कैरियर बाज़ार मल्टीप्लायर प्रभाव",
      "Decentralized Career Verification ROI": "विकेंद्रीकृत कैरियर सत्यापन आरओआई",
      "The CPA Impact of Professional Branding": "प्रोफेशनल ब्रांडिंग का सीपीए प्रभाव",
      "Global Tech Arbitrage Wage Gaps": "वैश्विक टेक आर्बिट्रेज वेतन अंतराल",
      "ROI of Specialized Technical Certifications": "विशेष तकनीकी प्रमाणपत्रों का आरओआई",
      "The Future of Digital Sales EPC": "डिजिटल सेल्स ईपीसी का भविष्य",
      "Market Saturation and Career ROI": "बाज़ार संतृप्ति और कैरियर आरओआई",
      "Career Arbitrage in Developing Economies": "विकासशील अर्थव्यवस्थाओं में कैरियर आर्बिट्रेज",
      "The Return on Investment of Soft Skills": "सॉफ्ट स्किल्स पर निवेश का प्रतिफल (ROI)",
      "Technical Recruitment ROI Metrics": "तकनीकी भर्ती आरओआई मेट्रिक्स",
      "EPC Growth in Cybersecurity Careers": "साइबर सुरक्षा व्यवसायों में ईपीसी वृद्धि",
      "CPA Optimization for Senior Developers": "वरिष्ठ डेवलपर्स के लिए सीपीए अनुकूलन",
      "The Job Market's EPC Frontier": "जॉब मार्केट का ईपीसी फ्रंटियर"
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

  openJobLink(link: string) {
    window.open(link, '_blank');
  }
}
