import { Component } from '@angular/core';

@Component({
    selector: 'app-privacy',
    standalone: true,
    template: `
    <div class="container" style="padding: 4rem 1.5rem;">
      <h1 style="margin-bottom: 2rem;">Privacy Policy</h1>
      <div class="card" style="line-height: 1.8;">
        <p>Your privacy is important to us. It is Job Opportunities' policy to respect your privacy regarding any information we may collect from you across our website.</p>
        
        <h3 style="margin-top: 1.5rem;">Information We Collect</h3>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        
        <h3 style="margin-top: 1.5rem;">Cookies and Web Beacons</h3>
        <p>Like any other website, Job Opportunities uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        
        <h3 style="margin-top: 1.5rem;">Google DoubleClick DART Cookie</h3>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
        
        <h3 style="margin-top: 1.5rem;">Our Advertising Partners</h3>
        <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense.</p>
      </div>
    </div>
  `
})
export class PrivacyComponent { }
