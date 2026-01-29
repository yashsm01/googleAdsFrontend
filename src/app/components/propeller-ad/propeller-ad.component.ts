import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-propeller-ad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-container" [ngStyle]="customStyle">
      <div [id]="'propeller-zone-' + zoneId"></div>
    </div>
  `,
  styles: [`
    .ad-container {
      margin: 1.5rem 0;
      min-height: 100px;
      overflow: hidden;
      display: flex;
      justify-content: center;
    }
  `]
})
export class PropellerAdComponent implements AfterViewInit {
  @Input() zoneId: string = environment.propellerAds.banner;
  @Input() customStyle: any = {};

  ngAfterViewInit() {
    this.injectAdScript();
  }

  private injectAdScript() {
    try {
      const script = document.createElement('script');
      script.setAttribute('data-cfasync', 'false');
      script.async = true;
      // Note: This is a placeholder Monetag script format. 
      // Replace with your actual script src from the Monetag dashboard.
      script.src = `//go.mobisla.com/notice.php?p=${this.zoneId}&interactive=1&pushads=1`;

      const container = document.getElementById('propeller-zone-' + this.zoneId);
      if (container) {
        container.appendChild(script);
      }
    } catch (e) {
      console.error('PropellerAds initialization error', e);
    }
  }
}
