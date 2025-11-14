import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Navbar } from '../../navbar/navbar';
import { Sidebar } from '../../sidebar/sidebar';
import { SidebarService } from '../../../services/sidebar.service';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, Navbar, Sidebar, BreadcrumbModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout implements OnInit {
  protected readonly sidebarService = inject(SidebarService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected breadcrumbItems = signal<MenuItem[]>([{ label: 'Home', icon: 'pi pi-home' }]);

  ngOnInit(): void {
    this.loadBreadcrumbs();
  }

  private loadBreadcrumbs(): void {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      const items: MenuItem[] = [{ label: 'Home', icon: 'pi pi-home', url: '/' }];
      breadcrumbs.forEach((bc) => {
        items.push({
          label: bc.label,
          url: bc.url,
          icon: bc.icon,
        });
      });
      this.breadcrumbItems.set(items);
    });
  }
}
