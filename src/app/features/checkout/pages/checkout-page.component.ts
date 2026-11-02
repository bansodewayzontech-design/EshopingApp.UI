import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontStateService } from '../../home/services/storefront-state.service';
import { CartService } from '../../cart/services/cart.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { OrdersService } from '../../orders/services/orders.service';

type PaymentMethod = 'cod' | 'upi' | 'card' | 'netbanking';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IconComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent {
  readonly storefront = inject(StorefrontStateService);
  readonly cart = inject(CartService);
  private readonly auth = inject(AuthService);
  private readonly orders = inject(OrdersService);
  readonly paymentMethod = signal<PaymentMethod>('cod');
  readonly orderPlaced = signal(false);
  readonly orderNumber = signal('');
  readonly orderError = signal('');
  couponInput = '';

  updateCoupon(event: Event): void {
    this.couponInput = (event.target as HTMLInputElement).value;
  }

  applyCoupon(event: SubmitEvent): void {
    event.preventDefault();
    this.cart.applyCoupon(this.couponInput);
  }

  placeOrder(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!this.storefront.cartItems().length) {
      this.orderError.set('Your bag is empty. Add a saree before checkout.');
      return;
    }
    if (!form.reportValidity()) {
      this.orderError.set('Please complete all required delivery details.');
      return;
    }
    const fields = new FormData(form);
    const id = `NM${Date.now().toString().slice(-8)}`;
    const address = {
      fullName: String(fields.get('name') ?? ''),
      phone: String(fields.get('phone') ?? ''),
      address: String(fields.get('address') ?? ''),
      city: String(fields.get('city') ?? ''),
      state: String(fields.get('state') ?? ''),
      postalCode: String(fields.get('postalCode') ?? '')
    };
    const lineItems = this.storefront.cartItems();
    const subtotal = this.storefront.cartSubtotal();
    const deliveryFee = this.storefront.deliveryFee();
    const discount = this.cart.couponDiscount();
    this.orders.createOrder({
      id,
      createdAt: new Date().toISOString(),
      items: lineItems,
      subtotal,
      deliveryFee,
      discount,
      total: this.cart.orderTotal(),
      paymentMethod: this.paymentMethod(),
      paymentStatus: this.paymentMethod() === 'cod' ? 'Pending' : 'Demo selected',
      status: 'Placed',
      address
    });
    if (this.auth.currentUser()) {
      this.auth.addAddress({ label: 'Delivery', ...address });
    }
    this.orderNumber.set(id);
    this.orderPlaced.set(true);
    this.orderError.set('');
    this.storefront.clearCart();
    this.cart.clearCoupon();
  }
}
