import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { SidebarService } from '../../services/sidebar.service';
import { DashboardService } from '../../services/dashboard.service';
import { OutletOption } from '../../model/dashboard.models';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected sidebarService = inject(SidebarService);
  private dashboardService = inject(DashboardService);

  protected outletOptions = signal<OutletOption[]>([]);
  protected selectedOutlet = signal<string>('outlet-1');
  protected notificationCount = signal<number>(2);

  constructor() {
    // Load outlet options
    this.dashboardService.getOutletOptions().subscribe((outlets) => {
      this.outletOptions.set(outlets);
    });
  }

  /**
   * Toggle sidebar (hamburger menu on mobile, permanent toggle on desktop)
   */
  protected toggleSidebar(): void {
    const device = this.sidebarService.deviceType();

    if (device === 'mobile' || device === 'tablet') {
      // Mobile/Tablet: Toggle overlay sidebar
      this.sidebarService.toggle();
    } else {
      // Desktop: Toggle permanent expansion
      this.sidebarService.togglePermanentExpansion();
    }
  }

  /**
   * Get selected outlet label
   */
  protected getSelectedOutletLabel(): string {
    const selected = this.outletOptions().find(o => o.value === this.selectedOutlet());
    return selected?.label || '';
  }
}
