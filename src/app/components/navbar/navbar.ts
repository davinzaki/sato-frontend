import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly sidebarService = inject(SidebarService);

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
}
