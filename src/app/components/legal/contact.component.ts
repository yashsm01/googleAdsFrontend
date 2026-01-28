import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="container" style="padding: 4rem 1.5rem;">
      <h1 class="outfit" style="margin-bottom: 2rem; text-align: center;">Contact Editorial Team</h1>
      <div class="card" style="max-width: 600px; margin: 0 auto; text-align: center; border-top: 5px solid var(--primary-color);">
        <p style="margin-bottom: 2rem; color: var(--text-muted); font-size: 1.1rem;">Have questions about our technical market analysis or career growth reports? Our editorial team is here to help.</p>
        
        <div style="background: var(--bg-color); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
          <h3 class="outfit" style="color: var(--primary-color); margin-bottom: 0.5rem;">Email Inquiry</h3>
          <p style="font-size: 1.25rem; font-weight: 700; color: var(--secondary-color); margin: 0;">ym21021998&#64;gmail.com</p>
        </div>
        
        <a href="mailto:ym21021998&#64;gmail.com" class="btn btn-primary" style="width: 100%; padding: 1rem; font-weight: 600;">
          CONTACT EDITORIAL TEAM
        </a>
        
        <p style="margin-top: 2rem; font-size: 0.9rem; color: var(--text-muted);">
          Technical inquiries are typically processed within 24-48 business hours.
        </p>
      </div>
    </div>
  `
})
export class ContactComponent { }
