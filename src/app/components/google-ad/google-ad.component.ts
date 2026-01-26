import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-ad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ad-container" [ngStyle]="customStyle">
      <ins class="adsbygoogle"
           style="display:block"
           [attr.data-ad-client]="adClient"
           [attr.data-ad-slot]="adSlot"
           [attr.data-ad-format]="adFormat"
           [attr.data-full-width-responsive]="fullWidthResponsive"></ins>
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
export class GoogleAdComponent implements AfterViewInit {
  @Input() adSlot: string = '';
  @Input() adFormat: string = 'auto';
  @Input() fullWidthResponsive: string = 'true';
  @Input() customStyle: any = {};

  adClient: string = environment.adSenseId;

  ngAfterViewInit() {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense initialization error', e);
    }
  }
}
