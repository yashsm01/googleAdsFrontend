import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-adsterra-ad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-container" [ngStyle]="customStyle">
      <div [id]="'adsterra-key-' + adKey"></div>
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
export class AdsterraAdComponent implements AfterViewInit {
  @Input() adKey: string = environment.adsterra.banner;
  @Input() customStyle: any = {};

  ngAfterViewInit() {
    this.injectAdScript();
  }

  private injectAdScript() {
    try {
      const container = document.getElementById('adsterra-key-' + this.adKey);
      if (!container) return;

      // Adsterra requires a global atOptions object
      (window as any).atOptions = {
        'key': this.adKey,
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformanceformat.com/${this.adKey}/invoke.js`;

      container.appendChild(script);
    } catch (e) {
      console.error('Adsterra initialization error', e);
    }
  }
}
