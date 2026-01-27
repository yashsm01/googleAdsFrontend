import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerStatusComponent } from './components/server-status/server-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServerStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
