import { Component } from '@angular/core';

@Component({
    selector: 'app-contact',
    standalone: true,
    template: `
    <div class="container" style="padding: 4rem 1.5rem;">
      <h1 style="margin-bottom: 2rem;">Contact Us</h1>
      <div class="card" style="max-width: 600px; margin: 0 auto; text-align: center;">
        <p style="margin-bottom: 2rem; color: var(--text-muted);">Have questions about job opportunities or carrier growth? Reach out to our team.</p>
        
        <div style="background: var(--bg-color); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
          <h3 style="color: var(--primary-color);">Email Support</h3>
          <p style="font-size: 1.2rem; font-weight: 600; margin: 1rem 0;">ym21021998&#64;gmail.com</p>
        </div>
        
        <a href="mailto:ym21021998&#64;gmail.com" class="btn btn-primary" style="width: 100%;">
          Send Us a Message
        </a>
        
        <p style="margin-top: 2rem; font-size: 0.9rem; color: var(--text-muted);">
          We typically respond within 24-48 business hours.
        </p>
      </div>
    </div>
  `
})
export class ContactComponent { }
