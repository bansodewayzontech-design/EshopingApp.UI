import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ProductCardComponent } from '../../home/components/product-card.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontStateService } from '../../home/services/storefront-state.service';
import { StorefrontProduct } from '../../home/models/storefront.models';
import { CatalogProduct } from '../models/catalog.models';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, RouterLink, IconComponent, ProductCardComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './product-detail-page.component.html'
})
export class ProductDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalog = inject(CatalogService);
  private readonly storefront = inject(StorefrontStateService);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly product = computed(() => this.catalog.findById(this.routeParams().get('id') ?? '') ?? null);
  private readonly imageSelection = signal({ productId: '', index: 0 });
  readonly selectedImageIndex = computed(() => {
    const product = this.product();
    const selection = this.imageSelection();
    return product && selection.productId === product.id ? selection.index : 0;
  });
  readonly selectedImage = computed(() => this.product()?.images[this.selectedImageIndex()] ?? this.product()?.image ?? '');
  readonly quantity = signal(1);
  readonly pinCode = signal('');
  readonly pinMessage = signal('');
  readonly sampleStars = [1, 2, 3, 4, 5];
  readonly similarProducts = computed(() => {
    const currentProduct = this.product();
    return currentProduct
      ? this.catalog.products().filter((product) => product.id !== currentProduct.id && product.category === currentProduct.category).slice(0, 4)
      : [];
  });

  selectImage(index: number): void {
    const product = this.product();
    if (product) this.imageSelection.set({ productId: product.id, index });
  }

  setPinCode(event: Event): void {
    this.pinCode.set((event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 6));
    this.pinMessage.set('');
  }

  checkDelivery(event: SubmitEvent): void {
    event.preventDefault();
    if (!/^\d{6}$/.test(this.pinCode())) {
      this.pinMessage.set('Enter a valid 6-digit PIN code.');
      return;
    }
    this.pinMessage.set(`Delivery is available for ${this.pinCode()} (demo check).`);
  }

  addToCart(product: CatalogProduct): void {
    this.storefront.addToCart(product, this.quantity());
  }

  buyNow(product: CatalogProduct): void {
    void this.router.navigate(['/checkout'], {
      queryParams: { mode: 'buy-now', productId: product.id, quantity: this.quantity() }
    });
  }

  decreaseQuantity(): void {
    this.quantity.update((quantity) => Math.max(1, quantity - 1));
  }

  increaseQuantity(): void {
    this.quantity.update((quantity) => Math.min(20, quantity + 1));
  }

  openSimilarProduct(product: StorefrontProduct): void {
    void this.router.navigate(['/products', product.id]);
  }
}
