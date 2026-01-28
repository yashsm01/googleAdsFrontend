import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container" style="padding: 4rem 1.5rem; max-width: 900px;">
      <h1 class="outfit" style="margin-bottom: 2rem; color: var(--secondary-color);">About Career Insights Portal</h1>
      
      <div class="card" style="line-height: 1.8; font-size: 1.1rem;">
        <p style="margin-bottom: 1.5rem;">
          Welcome to the <strong>Career Insights Portal</strong>, a specialized digital publication dedicated to technical market analysis, professional ROI scaling, and high-yield recruitment trends in the 2026 global economy.
        </p>

        <h2 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">Our Mission</h2>
        <p style="margin-bottom: 1.5rem;">
          In a rapidly shifting labor market, raw job data is no longer enough. Our mission is to provide <strong>Editorial-Grade Analysis</strong> that helps professionals understand the financial and technical mechanics behind niche industries—starting with the booming specialty coffee and hospitality sectors in India.
        </p>

        <h2 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">What We Do</h2>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li><strong>Quantitative Market Research:</strong> We analyze EPC (Earnings Per Customer) and CPA (Career Performance Authority) metrics to determine true career value.</li>
          <li><strong>Technical Auditing:</strong> We deep-dive into the technical skills required for 2026 roles, from sensory sensory analysis to digital inventory management.</li>
          <li><strong>Safety Verification:</strong> We provide guidance on navigating the job market safely to avoid recruitment fraud and unauthorized data collection.</li>
        </ul>

        <h2 class="outfit" style="margin-top: 2rem; color: var(--primary-color);">Editorial Standards</h2>
        <p style="margin-bottom: 1.5rem;">
          All content published on this portal undergoes a rigorous verification process. We cross-reference publicly available data with independent industry benchmarks to ensure our readers receive accurate, high-authority information.
        </p>

        <div style="background: var(--bg-color); padding: 2rem; border-radius: 12px; margin-top: 3rem; text-align: center;">
          <h3 class="outfit" style="color: var(--secondary-color);">Independent Analysis</h3>
          <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">
            We are an independent publication. We do not accept payment for job listings or employee endorsements, ensuring our reviews and analysis remain 100% objective.
          </p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent { }
