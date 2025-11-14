import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Billing, Inventory } from '../model/billing.models';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  getBillings(): Observable<Billing[]> {
    const billings: Billing[] = [
      {
        billingDate: 'October 11, 2023',
        outletName: 'Testing Outlet',
        orderId: '#697767',
        total: 20000,
        status: 'Waiting Payment',
        startDate: 'October 1, 2023',
        endDate: 'October 12, 2023',
        paymentDate: null,
      },
      {
        billingDate: 'October 15, 2023',
        outletName: 'Main Outlet',
        orderId: '#697890',
        total: 45000,
        status: 'Paid',
        startDate: 'October 5, 2023',
        endDate: 'October 16, 2023',
        paymentDate: 'October 15, 2023',
      },
      {
        billingDate: 'October 20, 2023',
        outletName: 'Branch Outlet',
        orderId: '#698123',
        total: 35000,
        status: 'Waiting Payment',
        startDate: 'October 10, 2023',
        endDate: 'October 21, 2023',
        paymentDate: null,
      },
      {
        billingDate: 'October 25, 2023',
        outletName: 'Testing Outlet',
        orderId: '#698456',
        total: 50000,
        status: 'Paid',
        startDate: 'October 15, 2023',
        endDate: 'October 26, 2023',
        paymentDate: 'October 24, 2023',
      },
      {
        billingDate: 'October 30, 2023',
        outletName: 'Downtown Outlet',
        orderId: '#698789',
        total: 28000,
        status: 'Overdue',
        startDate: 'October 20, 2023',
        endDate: 'October 31, 2023',
        paymentDate: null,
      },
    ];
    return of(billings);
  }

  getInventory(): Observable<Inventory[]> {
    const inventory: Inventory[] = [
      {
        productName: 'Clip Cover Robotic',
        category: 'Other',
        sizeUnit: '1 PCS',
        code: 'PR00153',
        usageLimit: '1x',
      },
      {
        productName: 'Coating Body ( ULTIMOHS C01 = 50 ml )',
        category: 'Detailing',
        sizeUnit: '50 ML',
        code: 'PR00085',
        usageLimit: '5x',
      },
      {
        productName: 'Ultimate Heavy Cut 1 L',
        category: 'Detailing',
        sizeUnit: '1 LITER',
        code: 'PR00083',
        usageLimit: '5x',
      },
      {
        productName: 'Snap Ring',
        category: 'Other',
        sizeUnit: '1 PCS',
        code: 'PR00149',
        usageLimit: '5x',
      },
      {
        productName: 'Ultimate Polish 1 L',
        category: 'Detailing',
        sizeUnit: '1 LITER',
        code: 'PR00084',
        usageLimit: '7x',
      },
    ];
    return of(inventory);
  }
}
