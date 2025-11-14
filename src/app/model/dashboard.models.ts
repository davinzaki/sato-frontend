export interface DashboardStats {
  totalRevenue: number;
  transactionCount: number;
  currency: string;
}

export interface ServiceCard {
  id: string;
  name: string;
  icon: string; // PrimeIcon class
  revenue: number;
  transactionCount: number;
  iconBackgroundColor: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface YearOption {
  label: string;
  value: number;
}

export interface OutletOption {
  label: string;
  value: string;
  icon?: string;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}
