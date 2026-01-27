import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-server-status',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="status-bar" [class.success]="isOnline" [class.error]="!isOnline && hasChecked" [class.checking]="!hasChecked"></div>
  `,
    styles: [`
    .status-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      z-index: 99999;
      transition: all 0.5s ease;
    }
    .status-bar.checking {
      background: linear-gradient(90deg, #6366f1, #a78bfa, #6366f1);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite linear;
    }
    .status-bar.success {
      background: linear-gradient(90deg, #10b981, #34d399, #10b981);
      box-shadow: 0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.4);
      animation: glow-green 2s ease-in-out infinite;
    }
    .status-bar.error {
      background: linear-gradient(90deg, #ef4444, #f87171, #ef4444);
      box-shadow: 0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.4);
      animation: glow-red 1s ease-in-out infinite;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes glow-green {
      0%, 100% { box-shadow: 0 0 8px #10b981, 0 0 15px rgba(16, 185, 129, 0.3); }
      50% { box-shadow: 0 0 15px #10b981, 0 0 30px rgba(16, 185, 129, 0.5); }
    }
    @keyframes glow-red {
      0%, 100% { box-shadow: 0 0 8px #ef4444, 0 0 15px rgba(239, 68, 68, 0.3); }
      50% { box-shadow: 0 0 15px #ef4444, 0 0 30px rgba(239, 68, 68, 0.5); }
    }
  `]
})
export class ServerStatusComponent implements OnInit {
    isOnline = false;
    hasChecked = false;

    ngOnInit() {
        this.pingServer();
    }

    pingServer() {
        const pingUrl = `${environment.apiUrl}/ping`;

        fetch(pingUrl)
            .then(res => {
                this.hasChecked = true;
                this.isOnline = res.ok;
            })
            .catch(() => {
                this.hasChecked = true;
                this.isOnline = false;
                console.log('Backend sleeping or unreachable');
            });
    }
}
