import { Component, signal } from '@angular/core';
import { DashboardLayout } from './components/layouts/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-root',
  imports: [DashboardLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sato-frontend');
}
