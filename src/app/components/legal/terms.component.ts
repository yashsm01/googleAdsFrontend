import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="container" style="padding: 4rem 1.5rem; max-width: 900px;">
      <h1 class="outfit" style="margin-bottom: 2rem;">Terms of Service</h1>
      <div class="card" style="line-height: 1.8; font-size: 1rem;">
        <p style="color: var(--text-muted); margin-bottom: 2rem;">Effective Date: January 28, 2026</p>
        
        <p>By accessing the <strong>Career Insights Portal</strong>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">1. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">2. Disclaimer</h3>
        <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, or fitness for a particular purpose.</p>
        
        <h3 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">3. Accuracy of Data</h3>
        <p>While we strive for technical accuracy, the materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>
      </div>
    </div>
  `
})
export class TermsComponent { }
