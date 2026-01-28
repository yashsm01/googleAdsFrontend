import { Component } from '@angular/core';

@Component({
    selector: 'app-terms',
    standalone: true,
    template: `
    <div class="container" style="padding: 4rem 1.5rem;">
      <h1 style="margin-bottom: 2rem;">Terms of Service</h1>
      <div class="card" style="line-height: 1.8;">
        <p>Welcome to Job Opportunities. By accessing our website, you agree to these terms and conditions.</p>
        
        <h3 style="margin-top: 1.5rem;">1. Acceptance of Terms</h3>
        <p>By using this site, you signify your acceptance of these terms. If you do not agree, please do not use our site.</p>
        
        <h3 style="margin-top: 1.5rem;">2. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials on Job Opportunities' website for personal, non-commercial transitory viewing only.</p>
        
        <h3 style="margin-top: 1.5rem;">3. Disclaimer</h3>
        <p>The materials on Job Opportunities' website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h3 style="margin-top: 1.5rem;">4. Accuracy of Materials</h3>
        <p>The materials appearing on Job Opportunities' website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>
      </div>
    </div>
  `
})
export class TermsComponent { }
