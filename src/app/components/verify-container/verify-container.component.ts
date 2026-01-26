import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { VerifyService } from '../../services/verify.service';

@Component({
  selector: 'app-verify-container',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './verify-container.component.html',
  styleUrl: './verify-container.component.css'
})
export class VerifyContainerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private verifyService: VerifyService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        // Reset flow state for a new session
        localStorage.removeItem('step1_verified');
        localStorage.removeItem('step2_countdown_started');
        localStorage.removeItem('bot_data');
        localStorage.removeItem('step1_done');
        localStorage.removeItem('step2_done');

        this.verifyService.setVerificationCode(code);
        // Clean URL: remove the code from the browser's address bar
        this.route.url.subscribe(() => {
          window.history.replaceState({}, '', window.location.pathname);
        });
      }
    });
  }
}
