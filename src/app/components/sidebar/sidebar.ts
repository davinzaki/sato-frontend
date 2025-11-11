import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly sidebarService = inject(SidebarService);

  // Menu items with PrimeIcons
  protected readonly menuItems: MenuItem[] = [
    { icon: 'pi-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'pi-chart-line', label: 'Analytics', route: '/analytics' },
    { icon: 'pi-box', label: 'Inventory', route: '/inventory' },
    { icon: 'pi-cog', label: 'Settings', route: '/settings' },
    { icon: 'pi-question-circle', label: 'Help', route: '/help' },
  ];

  // Track hover state for desktop expand-on-hover
  protected isHovered = false;

  /**
   * Handle mouse enter on sidebar (for desktop hover expand)
   */
  protected onMouseEnter(): void {
    if (this.sidebarService.deviceType() === 'desktop') {
      this.isHovered = true;
    }
  }

  /**
   * Handle mouse leave on sidebar (for desktop hover collapse)
   */
  protected onMouseLeave(): void {
    if (this.sidebarService.deviceType() === 'desktop') {
      this.isHovered = false;
    }
  }

  /**
   * Close sidebar (for mobile backdrop click)
   */
  protected closeSidebar(): void {
    this.sidebarService.close();
  }

  /**
   * Check if sidebar should show labels (expanded state)
   */
  protected shouldShowLabels(): boolean {
    const device = this.sidebarService.deviceType();

    // Mobile/Tablet: Always show labels when visible
    if (device === 'mobile' || device === 'tablet') {
      return true;
    }

    // Desktop: Show labels when permanently expanded OR hovered
    return this.sidebarService.isPermanentlyExpanded() || this.isHovered;
  }
}
