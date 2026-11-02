import { Injectable, computed, signal } from '@angular/core';
import { CATALOG_PRODUCTS } from '../data/catalog.data';
import { CatalogFilters, CatalogProduct } from '../models/catalog.models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly products = signal(CATALOG_PRODUCTS);
  readonly selectedProduct = signal<CatalogProduct | null>(null);
  readonly filters = signal<CatalogFilters>({
    category: null,
    priceLimit: 20000,
    minimumDiscount: 0,
    minimumRating: 0,
    fabric: null,
    color: null
  });
  readonly filteredProducts = computed(() => {
    const filters = this.filters();
    return this.products().filter((product) => {
      const discount = Math.round((1 - product.price / product.originalPrice) * 100);
      return (!filters.category || product.category === filters.category)
        && product.price <= filters.priceLimit
        && discount >= filters.minimumDiscount
        && product.rating >= filters.minimumRating
        && (!filters.fabric || product.fabric === filters.fabric)
        && (!filters.color || product.color === filters.color);
    });
  });

  findById(productId: string): CatalogProduct | undefined {
    return this.products().find((product) => product.id === productId);
  }

  updateFilters(updates: Partial<CatalogFilters>): void {
    this.filters.update((filters) => ({ ...filters, ...updates }));
  }

  resetFilters(): void {
    this.filters.set({ category: null, priceLimit: 20000, minimumDiscount: 0, minimumRating: 0, fabric: null, color: null });
  }
}
