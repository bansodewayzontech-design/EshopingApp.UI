import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { ProductCardComponent } from '../../home/components/product-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CATALOG_PRODUCTS } from '../../catalog/data/catalog.data';
import { StorefrontProduct } from '../../home/models/storefront.models';

@Component({
  selector: 'app-best-offers-page',
  standalone: true,
  imports: [CurrencyPipe, StorefrontHeaderComponent, StorefrontFooterComponent, ProductCardComponent, IconComponent],
  templateUrl: './best-offers-page.component.html'
})
export class BestOffersPageComponent {
  private readonly router = inject(Router);
  readonly products = CATALOG_PRODUCTS;
  readonly discountFilter = signal(0);
  readonly countdown = signal('');
  readonly offers = computed(() => this.products.filter((product) => this.discount(product) >= this.discountFilter()));
  readonly offerGroups = [
    { label: '20% OFF', minimum: 20, tone: 'bg-[#f3e7d8] text-[#542636]' },
    { label: '30% OFF', minimum: 30, tone: 'bg-[#edd9d4] text-[#6f1d35]' },
    { label: '50% OFF', minimum: 50, tone: 'bg-[#6f1d35] text-white' }
  ];

  constructor() {
    this.updateCountdown();
    interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.updateCountdown());
  }

  discount(product: StorefrontProduct): number {
    return Math.round((1 - product.price / product.originalPrice) * 100);
  }

  setDiscount(minimum: number): void {
    this.discountFilter.set(minimum);
  }

  onQuickView(product: StorefrontProduct): void {
    void this.router.navigate(['/products', product.id]);
  }

  private updateCountdown(): void {
    const deadline = new Date();
    deadline.setHours(23, 59, 59, 999);
    const remaining = Math.max(0, deadline.getTime() - Date.now());
    const hours = Math.floor(remaining / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);
    this.countdown.set([hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':'));
  }
}
