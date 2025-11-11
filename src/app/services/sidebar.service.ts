import { Injectable, signal, computed, effect } from '@angular/core';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Sidebar open/close state (for mobile overlay)
  private readonly isOpenSignal = signal<boolean>(false);

  // Permanent expansion state (for desktop toggle)
  private readonly isPermanentlyExpandedSignal = signal<boolean>(false);

  // Device type detection
  private readonly deviceTypeSignal = signal<DeviceType>(this.detectDeviceType());

  // Public readonly computed signals
  public readonly isOpen = this.isOpenSignal.asReadonly();
  public readonly isPermanentlyExpanded = this.isPermanentlyExpandedSignal.asReadonly();
  public readonly deviceType = this.deviceTypeSignal.asReadonly();

  // Computed: whether sidebar should be visible
  public readonly isVisible = computed(() => {
    const device = this.deviceTypeSignal();
    const isOpen = this.isOpenSignal();

    // On mobile/tablet, only show when explicitly opened
    if (device === 'mobile' || device === 'tablet') {
      return isOpen;
    }

    // On desktop, always visible (but can be collapsed)
    return true;
  });

  // Computed: whether sidebar should show labels (expanded)
  public readonly isExpanded = computed(() => {
    const device = this.deviceTypeSignal();

    // On mobile/tablet, always expanded when visible
    if (device === 'mobile' || device === 'tablet') {
      return true;
    }

    // On desktop, expanded when permanently toggled
    return this.isPermanentlyExpandedSignal();
  });

  constructor() {
    // Listen to window resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.deviceTypeSignal.set(this.detectDeviceType());
      });

      // Auto-close mobile sidebar when switching to desktop
      effect(() => {
        const device = this.deviceTypeSignal();
        if (device === 'desktop' && this.isOpenSignal()) {
          this.isOpenSignal.set(false);
        }
      });
    }
  }

  /**
   * Toggle sidebar open/close (for mobile hamburger menu)
   */
  public toggle(): void {
    this.isOpenSignal.update(value => !value);
  }

  /**
   * Open sidebar (for mobile)
   */
  public open(): void {
    this.isOpenSignal.set(true);
  }

  /**
   * Close sidebar (for mobile)
   */
  public close(): void {
    this.isOpenSignal.set(false);
  }

  /**
   * Toggle permanent expansion (for desktop toggle button)
   */
  public togglePermanentExpansion(): void {
    this.isPermanentlyExpandedSignal.update(value => !value);
  }

  /**
   * Detect device type based on window width
   */
  private detectDeviceType(): DeviceType {
    if (typeof window === 'undefined') {
      return 'desktop';
    }

    const width = window.innerWidth;

    // Mobile: < 768px (Tailwind md breakpoint)
    if (width < 768) {
      return 'mobile';
    }

    // Tablet: 768px - 1024px (Tailwind md to lg)
    if (width < 1024) {
      return 'tablet';
    }

    // Desktop: >= 1024px (Tailwind lg+)
    return 'desktop';
  }
}
