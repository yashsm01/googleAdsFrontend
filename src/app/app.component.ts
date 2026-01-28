import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ServerStatusComponent } from './components/server-status/server-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ServerStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
