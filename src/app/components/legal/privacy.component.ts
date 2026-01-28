import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="container" style="padding: 4rem 1.5rem; max-width: 900px;">
      <h1 class="outfit" style="margin-bottom: 2rem;">Privacy Policy</h1>
      <div class="card" style="line-height: 1.8; font-size: 1rem;">
        <p style="color: var(--text-muted); margin-bottom: 2rem;">Last Updated: January 28, 2026</p>
        
        <p>At <strong>Career Insights Portal</strong>, accessible from our primary domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">Information We Collect</h3>
        <p>We do not collect any personal identification information (PII) unless you explicitly contact us via email. We collect standard web log data, including IP addresses and browser types, solely for the purpose of technical analysis and anti-fraud measures.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">Google DoubleClick DART Cookie</h3>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">Advertising Partners Privacy Policies</h3>
        <p>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on our site, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">CCPA & GDPR Compliance</h3>
        <p>We respect your data rights. You have the right to request access, rectification, or erasure of any data we might have stored (limited to your email if you contact us). For any requests, please visit our <a routerLink="/contact">Contact Page</a>.</p>
      </div>
    </div>
  `
})
export class PrivacyComponent { }
