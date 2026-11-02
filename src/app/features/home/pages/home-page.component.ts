import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorefrontHeaderComponent } from '../components/storefront-header.component';
import { StorefrontFooterComponent } from '../components/storefront-footer.component';
import { CategoryCardComponent } from '../components/category-card.component';
import { ProductCardComponent } from '../components/product-card.component';
import { PromoCardComponent } from '../components/promo-card.component';
import { TestimonialCardComponent } from '../components/testimonial-card.component';
import { NewsletterComponent } from '../components/newsletter.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { STORE_CATEGORIES, STORE_PRODUCTS, STORE_PROMOTIONS, STORE_TESTIMONIALS } from '../data/storefront.data';
import { StorefrontProduct } from '../models/storefront.models';
import { StorefrontStateService } from '../services/storefront-state.service';
import { VIRAL_SAREE_VIDEOS } from '../../viral-sarees/data/viral-sarees.data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
    IconComponent,
    StorefrontHeaderComponent,
    StorefrontFooterComponent,
    CategoryCardComponent,
    ProductCardComponent,
    PromoCardComponent,
    TestimonialCardComponent,
    NewsletterComponent
  ],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  private readonly router = inject(Router);
  readonly categories = STORE_CATEGORIES;
  readonly promotions = STORE_PROMOTIONS;
  readonly testimonials = STORE_TESTIMONIALS;
  readonly viralVideos = VIRAL_SAREE_VIDEOS;
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<string | null>(null);
  readonly quickViewProduct = signal<StorefrontProduct | null>(null);
  readonly state = inject(StorefrontStateService);
  readonly newArrivals = STORE_PRODUCTS.filter((product) => product.isNew);
  readonly bestSellers = STORE_PRODUCTS.filter((product) => product.isBestSeller);
  readonly filteredProducts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    return STORE_PRODUCTS.filter((product) => {
      const matchesQuery = !query || `${product.name} ${product.category}`.toLowerCase().includes(query);
      const matchesCategory = !category
        || product.category === category
        || (category === "Women's fashion" && product.category !== "Men's fashion");
      return matchesQuery && matchesCategory;
    });
  });

  selectCategory(category: string): void {
    void this.router.navigate(['/categories', category.toLowerCase().replace(/\s+/g, '-')]);
  }

  openQuickView(product: StorefrontProduct): void {
    this.quickViewProduct.set(product);
  }

  closeQuickView(): void {
    this.quickViewProduct.set(null);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.selectedCategory.set(null);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set(null);
  }

  addQuickViewToBag(product: StorefrontProduct): void {
    this.state.addToCart(product);
    this.closeQuickView();
  }

  @HostListener('document:keydown.escape')
  closeQuickViewOnEscape(): void {
    this.closeQuickView();
  }
}
