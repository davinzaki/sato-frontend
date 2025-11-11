import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';
import { Sidebar } from '../../sidebar/sidebar';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, Navbar, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  protected readonly sidebarService = inject(SidebarService);
}
