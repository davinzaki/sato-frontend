import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { BreadcrumbItem } from '../model/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumbs$: Observable<BreadcrumbItem[]> = this.breadcrumbsSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        const breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
        this.breadcrumbsSubject.next(breadcrumbs);
      });
  }

  /**
   * Build breadcrumbs from route data
   */
  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    // Get breadcrumb label from route data
    const label = route.routeConfig?.data?.['breadcrumb'];
    const path = route.routeConfig?.path || '';

    // Build current URL
    const nextUrl = path ? `${url}/${path}` : url;

    // Add breadcrumb if label exists
    const newBreadcrumbs = label
      ? [...breadcrumbs, { label, url: nextUrl }]
      : breadcrumbs;

    // Recursively process child routes
    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

  /**
   * Manually set breadcrumbs
   */
  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]): void {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  /**
   * Get current breadcrumbs value
   */
  getCurrentBreadcrumbs(): BreadcrumbItem[] {
    return this.breadcrumbsSubject.value;
  }
}
