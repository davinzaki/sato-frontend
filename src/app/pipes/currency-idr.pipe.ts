import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyIdr',
  standalone: true
})
export class CurrencyIdrPipe implements PipeTransform {
  /**
   * Transform number to Indonesian Rupiah format
   * Example: 11282500 -> "Rp. 11.282.500"
   */
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return 'Rp. 0';
    }

    // Format dengan thousand separator (titik)
    const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `Rp. ${formatted}`;
  }
}
