import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private apiUrl = `${environment.apiUrl}/admin/grant-access`;

  // Signals for state management
  verificationCode = signal<string | null>(null);
  step1Completed = signal<boolean>(false);
  step2Completed = signal<boolean>(false);
  botData = signal<any>(null);

  constructor(private http: HttpClient) { }

  setVerificationCode(code: string) {
    this.verificationCode.set(code);
    localStorage.setItem('verification_code', code);
  }

  getVerificationCode(): string | null {
    if (!this.verificationCode()) {
      const stored = localStorage.getItem('verification_code');
      if (stored) {
        this.verificationCode.set(stored);
      }
    }
    return this.verificationCode();
  }

  grantAccess(code: string): Observable<any> {
    return this.http.post(this.apiUrl, { code });
  }

  completeStep1() {
    this.step1Completed.set(true);
    localStorage.setItem('step1_done', 'true');
  }

  completeStep2() {
    this.step2Completed.set(true);
    localStorage.setItem('step2_done', 'true');
  }

  isStep1Completed(): boolean {
    return this.step1Completed() || localStorage.getItem('step1_done') === 'true';
  }

  isStep2Completed(): boolean {
    return this.step2Completed() || localStorage.getItem('step2_done') === 'true';
  }

  setBotData(data: any) {
    this.botData.set(data);
    localStorage.setItem('bot_data', JSON.stringify(data));
  }

  getBotData() {
    if (!this.botData()) {
      const stored = localStorage.getItem('bot_data');
      if (stored) {
        this.botData.set(JSON.parse(stored));
      }
    }
    return this.botData();
  }
}
