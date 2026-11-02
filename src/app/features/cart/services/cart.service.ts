import { Injectable, computed, inject, signal } from '@angular/core';
import { StorefrontStateService } from '../../home/services/storefront-state.service';

interface CartCoupon {
  code: string;
  kind: 'percentage' | 'fixed';
  value: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storefront = inject(StorefrontStateService);
  readonly coupon = signal<CartCoupon | null>(null);
  readonly couponMessage = signal('');
  readonly couponDiscount = computed(() => {
    const active = this.coupon();
    if (!active) return 0;
    const subtotal = this.storefront.cartSubtotal();
    const amount = active.kind === 'percentage' ? subtotal * active.value / 100 : active.value;
    return Math.min(subtotal, Math.round(amount));
  });
  readonly orderTotal = computed(() => Math.max(0, this.storefront.cartSubtotal() + this.storefront.deliveryFee() - this.couponDiscount()));

  applyCoupon(value: string): void {
    const code = value.trim().toUpperCase();
    if (code === 'SAREE10') {
      this.coupon.set({ code, kind: 'percentage', value: 10 });
      this.couponMessage.set('SAREE10 applied: 10% off your subtotal.');
      return;
    }
    if (code === 'FESTIVE500') {
      this.coupon.set({ code, kind: 'fixed', value: 500 });
      this.couponMessage.set('FESTIVE500 applied: ₹500 off your subtotal.');
      return;
    }
    this.couponMessage.set('That coupon is not valid. Try SAREE10 or FESTIVE500.');
  }

  clearCoupon(): void {
    this.coupon.set(null);
    this.couponMessage.set('Coupon removed.');
  }
}
