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
    showVerifyBtn = false;
    showContinueBtn = false;
    interval: any;

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
            title: "Senior Barista",
            company: "The Coffee Bean & Tea Leaf",
            location: "Bengaluru, Karnataka",
            via: "Indeed",
            salary: "₹25,000–₹35,000 per month",
            description: "Expert level coffee preparation, team coordination, and customer relationship management.",
            thumbnail: "https://picsum.photos/100/100?random=2",
            applyLink: "https://in.indeed.com/viewjob?jk=d345a5b8732ce26e"
        },
        {
            title: "Cafe Manager",
            company: "Starbucks India",
            location: "Mumbai, Maharashtra",
            via: "LinkedIn",
            salary: "₹45,000–₹55,000 per month",
            description: "Overall cafe operations, P&L management, and brand compliance standards.",
            thumbnail: "https://picsum.photos/100/100?random=3",
            applyLink: "https://in.indeed.com/viewjob?jk=c234a5b8732ce26e"
        },
        {
            title: "Assistant Barista",
            company: "Blue Tokai Coffee Roasters",
            location: "Delhi NCR",
            via: "Apna",
            salary: "₹18,000–₹22,000 per month",
            description: "Assisting senior baristas, maintaining cleanliness, and learning specialty brewing techniques.",
            thumbnail: "https://picsum.photos/100/100?random=4",
            applyLink: "https://in.indeed.com/viewjob?jk=b123a5b8732ce26e"
        },
        {
            title: "F&B Executive",
            company: "Taj Hotels",
            location: "Pan India",
            via: "Indeed",
            salary: "₹30,000–₹40,000 per month",
            description: "Luxury service standards, premium coffee service, and guest experience optimization.",
            thumbnail: "https://picsum.photos/100/100?random=5",
            applyLink: "https://in.indeed.com/viewjob?jk=a012a5b8732ce26e"
        }
    ];

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

    constructor(
        private router: Router,
        private verifyService: VerifyService
    ) { }

    ngOnInit() {
        this.startTimer();
    }

    ngOnDestroy() {
        this.stopTimer();
    }

    startTimer() {
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
        this.verifyService.completeStep1();
        this.showContinueBtn = true;
    }

    onContinueClick() {
        this.router.navigate(['/verify/step2']);
    }

    openJobLink(link: string) {
        window.open(link, '_blank');
    }
}
