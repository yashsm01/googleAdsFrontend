import { Routes } from '@angular/router';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { VerifyContainerComponent } from './components/verify-container/verify-container.component';
import { PrivacyComponent } from './components/legal/privacy.component';
import { TermsComponent } from './components/legal/terms.component';
import { ContactComponent } from './components/legal/contact.component';
import { AboutComponent } from './components/legal/about.component';

export const routes: Routes = [
    {
        path: 'verify',
        component: VerifyContainerComponent,
        children: [
            { path: 'step1', component: Step1Component },
            { path: 'step2', component: Step2Component },
            { path: 'step3', component: Step3Component },
            { path: 'step4', component: Step4Component },
            { path: '', redirectTo: 'step1', pathMatch: 'full' }
        ]
    },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: 'verify', pathMatch: 'full' },
    { path: '**', redirectTo: 'verify' }
];
