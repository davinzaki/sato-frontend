import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  DashboardStats,
  ServiceCard,
  ChartData,
  YearOption,
  OutletOption,
} from '../model/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  /**
   * Get dashboard statistics (Total Revenue & Transaction Count)
   */
  getDashboardStats(): Observable<DashboardStats> {
    return of({
      totalRevenue: 11282500,
      transactionCount: 248,
      currency: 'IDR',
    });
  }

  /**
   * Get service cards data
   */
  getServiceCards(): Observable<ServiceCard[]> {
    return of([
      {
        id: '1',
        name: 'Carwash',
        icon: 'pi-car',
        revenue: 9720000,
        transactionCount: 199,
        iconBackgroundColor: '#E0F2F7',
      },
      {
        id: '2',
        name: 'Spotwash',
        icon: 'pi-sparkles',
        revenue: 0,
        transactionCount: 0,
        iconBackgroundColor: '#E0F2F7',
      },
      {
        id: '3',
        name: 'Detailing',
        icon: 'pi-star',
        revenue: 0,
        transactionCount: 0,
        iconBackgroundColor: '#E0F2F7',
      },
      {
        id: '4',
        name: 'Food & Beverage',
        icon: 'pi-shopping-bag',
        revenue: 865000,
        transactionCount: 98,
        iconBackgroundColor: '#E0F2F7',
      },
      {
        id: '5',
        name: 'Store',
        icon: 'pi-shop',
        revenue: 697500,
        transactionCount: 27,
        iconBackgroundColor: '#E0F2F7',
      },
    ]);
  }

  /**
   * Get Trend Sales chart data
   */
  getTrendSalesData(year: number): Observable<ChartData> {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          data: [
            200000, 300000, 250000, 400000, 350000, 500000, 450000, 600000, 550000, 700000,
            3400000, 650000,
          ],
          backgroundColor: '#177E94',
          borderColor: '#177E94',
          borderWidth: 1,
        },
      ],
    });
  }

  /**
   * Get Trend Cost chart data
   */
  getTrendCostData(year: number): Observable<ChartData> {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Cost',
          data: [0, 0, 0, 0, 0, 50000, 0, 20000, 0, 0, 0, 0],
          backgroundColor: '#177E94',
          borderColor: '#177E94',
          borderWidth: 1,
        },
      ],
    });
  }

  /**
   * Get Trend Profit chart data
   */
  getTrendProfitData(year: number): Observable<ChartData> {
    return of({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Profit',
          data: [
            200000, 300000, 250000, 400000, 350000, 450000, 450000, 580000, 550000, 3200000,
            700000, 650000,
          ],
          backgroundColor: '#177E94',
          borderColor: '#177E94',
          borderWidth: 1,
        },
      ],
    });
  }

  /**
   * Get available years for filter
   */
  getYearOptions(): Observable<YearOption[]> {
    const currentYear = new Date().getFullYear();
    return of([
      { label: (currentYear - 2).toString(), value: currentYear - 2 },
      { label: (currentYear - 1).toString(), value: currentYear - 1 },
      { label: currentYear.toString(), value: currentYear },
    ]);
  }

  /**
   * Get available outlets
   */
  getOutletOptions(): Observable<OutletOption[]> {
    return of([
      { label: 'Testing Outlet', value: 'outlet-1', icon: 'pi-shop' },
      { label: 'Main Outlet', value: 'outlet-2', icon: 'pi-shop' },
      { label: 'Branch Outlet', value: 'outlet-3', icon: 'pi-shop' },
    ]);
  }
}
