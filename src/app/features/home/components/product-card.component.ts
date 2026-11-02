import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { StorefrontStateService } from '../services/storefront-state.service';
import { StorefrontProduct } from '../models/storefront.models';
import { IconComponent } from '../../../shared/components/icon/icon.component';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=75';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, IconComponent],
  template: `
    <article class="group flex h-full flex-col">
      <div class="relative aspect-[4/5] overflow-hidden bg-[#eee8e0]">
        @if (!imageLoaded()) {
          <div class="absolute inset-0 animate-pulse bg-[#e8dfd7]" aria-label="Loading product image"></div>
        }
        <img
          [src]="product().image"
          [alt]="product().name"
          loading="lazy"
          (load)="imageLoaded.set(true)"
          (error)="handleImageError($event)"
          class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          [class.opacity-0]="!imageLoaded()"
        />
        @if (product().badge; as badge) {
          <span class="absolute left-3 top-3 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f1d35] shadow-sm">
            {{ badge }}
          </span>
        }
        <span class="absolute right-3 top-3 bg-[#6f1d35] px-2.5 py-1 text-[10px] font-semibold text-white">
          -{{ discount() }}%
        </span>
        <button
          type="button"
          (click)="toggleWishlist()"
          [attr.aria-label]="state.isWishlisted(product().id) ? 'Remove ' + product().name + ' from wishlist' : 'Add ' + product().name + ' to wishlist'"
          [attr.aria-pressed]="state.isWishlisted(product().id)"
          class="absolute right-3 top-12 grid h-10 w-10 place-items-center bg-white/95 text-[#542636] shadow-sm transition hover:bg-[#6f1d35] hover:text-white"
        >
          <app-icon name="heart" [size]="18" />
        </button>
        <button
          type="button"
          (click)="quickView.emit(product())"
          class="absolute inset-x-3 bottom-3 flex min-h-10 items-center justify-center gap-2 bg-white/95 px-3 py-2 text-xs font-semibold tracking-wide text-[#2c2827] opacity-100 shadow-sm transition hover:bg-[#6f1d35] hover:text-white md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          [attr.aria-label]="'Quick view ' + product().name"
        >
          Quick view <app-icon name="arrow-up-right" [size]="15" />
        </button>
      </div>
      <div class="flex flex-1 flex-col pt-3.5">
        <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#8c7770]">{{ product().category }}</p>
        <h3 class="mt-1 line-clamp-2 min-h-10 font-display text-lg leading-snug text-[#292322] sm:text-xl">
          {{ product().name }}
        </h3>
        <div class="mt-1.5 flex items-center gap-1.5 text-xs text-[#8c7770]">
          <app-icon name="star" [size]="13" class="text-[#b17b3a]" />
          <span class="font-semibold text-[#453c39]">{{ product().rating.toFixed(1) }}</span>
          <span>({{ product().reviewCount }})</span>
        </div>
        <div class="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-2.5">
          <span class="text-sm font-semibold text-[#292322]">{{ product().price | currency:'INR':'symbol':'1.0-0' }}</span>
          <span class="text-xs text-[#9b8e88] line-through">{{ product().originalPrice | currency:'INR':'symbol':'1.0-0' }}</span>
        </div>
        <button
          type="button"
          (click)="addToCart()"
          class="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 border border-[#d9c9c1] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#542636] transition hover:border-[#6f1d35] hover:bg-[#6f1d35] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f1d35]"
        >
          <app-icon name="bag" [size]="16" /> Add to bag
        </button>
      </div>
    </article>
  `
})
export class ProductCardComponent {
  readonly product = input.required<StorefrontProduct>();
  readonly quickView = output<StorefrontProduct>();
  readonly imageLoaded = signal(false);
  readonly discount = computed(() =>
    Math.round((1 - this.product().price / this.product().originalPrice) * 100)
  );
  readonly state: StorefrontStateService;

  constructor(state: StorefrontStateService) {
    this.state = state;
  }

  addToCart(): void {
    this.state.addToCart(this.product());
  }

  toggleWishlist(): void {
    this.state.toggleWishlist(this.product());
  }

  handleImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.includes('photo-1515886657613-9f3515b0c78f')) {
      image.src = FALLBACK_IMAGE;
      return;
    }
    this.imageLoaded.set(true);
  }
}
