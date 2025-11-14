import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { DashboardService } from '../../services/dashboard.service';
import { BillingService } from '../../services/billing.service';
import { CurrencyIdrPipe } from '../../pipes/currency-idr.pipe';
import { DashboardStats, ServiceCard, YearOption } from '../../model/dashboard.models';
import { Billing, Inventory } from '../../model/billing.models';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DatePicker,
    Select,
    ChartModule,
    CurrencyIdrPipe,
    Card,
    TableModule,
    Tag,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private billingService = inject(BillingService);

  // Dashboard Header
  protected selectedDate = signal<Date | null>(new Date());

  // Dashboard Stats
  protected dashboardStats = signal<DashboardStats | null>(null);

  // Service Cards
  protected serviceCards = signal<ServiceCard[]>([]);

  // Chart Section
  protected yearOptions = signal<YearOption[]>([]);
  protected selectedYear = signal<number>(new Date().getFullYear());
  protected salesChartData = signal<any>(null);
  protected costChartData = signal<any>(null);
  protected profitChartData = signal<any>(null);
  protected chartOptions: any;

  // Tables
  protected billings = signal<Billing[]>([]);
  protected inventory = signal<Inventory[]>([]);

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadYearOptions();
    this.loadChartData();
    this.initChartOptions();
    this.loadTableData();
  }

  private loadDashboardData(): void {
    // Load dashboard stats
    this.dashboardService.getDashboardStats().subscribe((stats) => {
      this.dashboardStats.set(stats);
    });

    // Load service cards
    this.dashboardService.getServiceCards().subscribe((cards) => {
      this.serviceCards.set(cards);
    });
  }

  private loadYearOptions(): void {
    this.dashboardService.getYearOptions().subscribe((years) => {
      this.yearOptions.set(years);
    });
  }

  private loadChartData(): void {
    const year = this.selectedYear();

    // Load Sales data
    this.dashboardService.getTrendSalesData(year).subscribe((data) => {
      this.salesChartData.set(data);
    });

    // Load Cost data
    this.dashboardService.getTrendCostData(year).subscribe((data) => {
      this.costChartData.set(data);
    });

    // Load Profit data
    this.dashboardService.getTrendProfitData(year).subscribe((data) => {
      this.profitChartData.set(data);
    });
  }

  private initChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value: any) {
              return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                notation: 'compact',
              }).format(value);
            },
          },
        },
      },
    };
  }

  private loadTableData(): void {
    // Load billing data
    this.billingService.getBillings().subscribe((billings) => {
      this.billings.set(billings);
    });

    // Load inventory data
    this.billingService.getInventory().subscribe((inventory) => {
      this.inventory.set(inventory);
    });
  }

  // Dashboard Header Methods
  protected onExport(): void {
    console.log('Export clicked');
    // TODO: Implement export functionality
  }

  protected onListExported(): void {
    console.log('List exported clicked');
    // TODO: Implement list exported functionality
  }

  // Chart Methods
  protected onYearChange(): void {
    this.loadChartData();
  }

  // Table Methods
  protected getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Waiting Payment':
        return 'warn';
      case 'Overdue':
        return 'danger';
      default:
        return 'warn';
    }
  }

  protected onSeeDetails(id: string): void {
    console.log('See details:', id);
    // TODO: Implement see details functionality
  }
}
