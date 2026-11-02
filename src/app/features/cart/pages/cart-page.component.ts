import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontStateService } from '../../home/services/storefront-state.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IconComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {
  readonly storefront = inject(StorefrontStateService);
  readonly cart = inject(CartService);
  couponInput = '';

  updateCoupon(event: Event): void {
    this.couponInput = (event.target as HTMLInputElement).value;
  }

  applyCoupon(event: SubmitEvent): void {
    event.preventDefault();
    this.cart.applyCoupon(this.couponInput);
  }

  removeCoupon(): void {
    this.cart.clearCoupon();
    this.couponInput = '';
  }
}
