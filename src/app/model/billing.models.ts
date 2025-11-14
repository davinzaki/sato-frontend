export interface Billing {
  billingDate: string;
  outletName: string;
  orderId: string;
  total: number;
  status: 'Waiting Payment' | 'Paid' | 'Overdue';
  startDate: string;
  endDate: string;
  paymentDate: string | null;
}

export interface Inventory {
  productName: string;
  category: string;
  sizeUnit: string;
  code: string;
  usageLimit: string;
}
