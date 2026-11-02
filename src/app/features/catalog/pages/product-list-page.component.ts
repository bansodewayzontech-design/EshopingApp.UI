import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { ProductCardComponent } from '../../home/components/product-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontProduct } from '../../home/models/storefront.models';
import { CatalogService } from '../services/catalog.service';
import { CATALOG_PRODUCTS, SAREE_CATEGORIES } from '../data/catalog.data';

type ProductSort = 'recommended' | 'price-low' | 'price-high' | 'newest' | 'bestselling';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [CurrencyPipe, StorefrontHeaderComponent, StorefrontFooterComponent, ProductCardComponent, IconComponent],
  templateUrl: './product-list-page.component.html'
})
export class ProductListPageComponent {
  readonly catalog = inject(CatalogService);
  private readonly router = inject(Router);
  readonly categories = SAREE_CATEGORIES;
  readonly products = CATALOG_PRODUCTS;
  readonly sortBy = signal<ProductSort>('recommended');
  readonly visibleCount = signal(8);
  readonly filterPanelOpen = signal(false);
  readonly fabrics = [...new Set(CATALOG_PRODUCTS.map((product) => product.fabric))];
  readonly colors = [...new Set(CATALOG_PRODUCTS.map((product) => product.color))];
  readonly categoryTitle = computed(() => this.catalog.filters().category ?? 'All sarees');
  readonly sortedProducts = computed(() => {
    const products = [...this.catalog.filteredProducts()];
    switch (this.sortBy()) {
      case 'price-low': return products.sort((left, right) => left.price - right.price);
      case 'price-high': return products.sort((left, right) => right.price - left.price);
      case 'newest': return products.sort((left, right) => Number(right.isNew) - Number(left.isNew));
      case 'bestselling': return products.sort((left, right) => Number(right.isBestSeller) - Number(left.isBestSeller));
      default: return products;
    }
  });
  readonly visibleProducts = computed(() => this.sortedProducts().slice(0, this.visibleCount()));

  constructor() {
    const route = inject(ActivatedRoute);
    const categorySlug = route.snapshot.paramMap.get('slug') ?? route.snapshot.queryParamMap.get('category');
    if (categorySlug) {
      const normalizedSlug = categorySlug.toLowerCase().replace(/[-_]/g, ' ');
      const match = this.categories.find((category) => category.toLowerCase() === normalizedSlug);
      if (match) this.catalog.updateFilters({ category: match });
    } else {
      this.catalog.resetFilters();
    }
  }

  setCategory(event: Event): void {
    this.visibleCount.set(8);
    this.catalog.updateFilters({ category: (event.target as HTMLSelectElement).value || null });
  }

  setPrice(event: Event): void {
    this.visibleCount.set(8);
    this.catalog.updateFilters({ priceLimit: Number((event.target as HTMLInputElement).value) });
  }

  setDiscount(event: Event): void {
    this.visibleCount.set(8);
    this.catalog.updateFilters({ minimumDiscount: Number((event.target as HTMLSelectElement).value) });
  }

  setRating(event: Event): void {
    this.visibleCount.set(8);
    this.catalog.updateFilters({ minimumRating: Number((event.target as HTMLSelectElement).value) });
  }

  setFabric(event: Event): void {
    this.visibleCount.set(8);
    this.catalog.updateFilters({ fabric: (event.target as HTMLSelectElement).value || null });
  }

  setColor(event: Event): void {
    this.visibleCount.set(8);
    this.catalog.updateFilters({ color: (event.target as HTMLSelectElement).value || null });
  }

  setSort(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as ProductSort);
  }

  clearFilters(): void {
    this.catalog.resetFilters();
    this.visibleCount.set(8);
  }

  loadMore(): void {
    this.visibleCount.update((count) => count + 4);
  }

  toggleFilters(): void {
    this.filterPanelOpen.update((open) => !open);
  }

  openDetails(product: StorefrontProduct): void {
    void this.router.navigate(['/products', product.id]);
  }
}
