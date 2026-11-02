import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontStateService } from '../../home/services/storefront-state.service';
import { CartService } from '../../cart/services/cart.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { OrdersService } from '../../orders/services/orders.service';
import { CatalogService } from '../../catalog/services/catalog.service';
import { ViralSareesService } from '../../viral-sarees/services/viral-sarees.service';
import { CartLineItem, StorefrontProduct } from '../../home/models/storefront.models';
import { OrderAddress, StoreOrder } from '../../orders/models/order.models';
import { SavedAddress } from '../../../core/auth/models/auth.models';

type PaymentMethod = 'cod' | 'upi' | 'card' | 'netbanking';
type CheckoutStep = 'entry' | 'otp' | 'delivery' | 'payment';
type OtpPurpose = 'guest' | 'mobile-login' | null;

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, ReactiveFormsModule, RouterLink, IconComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent {
  readonly storefront = inject(StorefrontStateService);
  readonly cart = inject(CartService);
  readonly auth = inject(AuthService);
  private readonly orders = inject(OrdersService);
  private readonly catalog = inject(CatalogService);
  private readonly viralSarees = inject(ViralSareesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly checkoutMode: 'buy-now' | 'cart' = this.route.snapshot.queryParamMap.get('mode') === 'buy-now' ? 'buy-now' : 'cart';
  readonly buyNowProduct = computed(() => {
    if (this.checkoutMode !== 'buy-now') return null;
    const productId = this.route.snapshot.queryParamMap.get('productId') ?? '';
    return this.catalog.findById(productId) ?? this.viralSarees.productForCheckout(productId);
  });
  readonly orderItems = computed<CartLineItem[]>(() => {
    if (this.checkoutMode !== 'buy-now') return this.storefront.cartItems();
    const product = this.buyNowProduct();
    if (!product) return [];
    const requestedQuantity = Number(this.route.snapshot.queryParamMap.get('quantity') ?? '1');
    const quantity = Number.isInteger(requestedQuantity) ? Math.min(20, Math.max(1, requestedQuantity)) : 1;
    return [{ product, quantity }];
  });
  readonly orderSubtotal = computed(() => this.orderItems().reduce((total, item) => total + item.product.price * item.quantity, 0));
  readonly deliveryFee = computed(() => this.orderSubtotal() === 0 || this.orderSubtotal() >= 2999 ? 0 : 99);
  readonly couponDiscount = computed(() => this.cart.couponDiscountFor(this.orderSubtotal()));
  readonly orderTotal = computed(() => Math.max(0, this.orderSubtotal() + this.deliveryFee() - this.couponDiscount()));
  readonly checkoutStep = signal<CheckoutStep>(this.auth.isAuthenticated() ? 'delivery' : 'entry');
  readonly guestMode = signal(false);
  readonly guestOtpVerified = signal(false);
  readonly otpPurpose = signal<OtpPurpose>(null);
  readonly otpSent = signal(false);
  readonly otpMessage = signal('');
  readonly otpError = signal('');
  readonly selectedAddressId = signal<string | null>(null);
  readonly addressMessage = signal('');
  readonly showDeliveryErrors = signal(false);
  readonly simulatePaymentFailure = signal(false);
  readonly paymentError = signal('');
  readonly paymentMethod = signal<PaymentMethod>('cod');
  readonly addressLabel = signal<'Home' | 'Office' | 'Other'>('Home');
  readonly confirmationOrder = signal<StoreOrder | null>(null);
  readonly orderError = signal('');
  readonly couponInput = signal('');
  readonly otpForm = this.formBuilder.group({
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    code: ['']
  });
  readonly deliveryForm = this.formBuilder.group({
    fullName: [this.auth.currentUser()?.fullName ?? '', Validators.required],
    phone: [this.auth.currentUser()?.phone ?? '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: [this.auth.currentUser()?.email ?? '', Validators.email],
    house: ['', Validators.required],
    street: ['', Validators.required],
    landmark: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  constructor() {
    const user = this.auth.currentUser();
    if (!user) return;
    this.deliveryForm.patchValue({ fullName: user.fullName, phone: user.phone, email: user.email });
    if (user.addresses.length) this.selectSavedAddress(user.addresses[0]);
  }

  startGuestCheckout(): void {
    this.guestMode.set(true);
    this.guestOtpVerified.set(false);
    this.checkoutStep.set('delivery');
  }

  startMobileLogin(): void {
    this.guestMode.set(false);
    this.guestOtpVerified.set(false);
    this.startOtp('mobile-login');
  }

  private startOtp(purpose: Exclude<OtpPurpose, null>): void {
    this.otpPurpose.set(purpose);
    this.otpSent.set(false);
    this.otpMessage.set('');
    this.otpError.set('');
    const phone = purpose === 'mobile-login'
      ? this.auth.currentUser()?.phone ?? ''
      : purpose === 'guest' ? this.deliveryForm.controls.phone.value ?? '' : '';
    this.otpForm.reset({ phone, code: '' });
    this.otpForm.controls.code.clearValidators();
    this.otpForm.controls.code.updateValueAndValidity();
    this.checkoutStep.set('otp');
  }

  sendOtp(): void {
    this.otpForm.controls.phone.markAsTouched();
    if (this.otpForm.controls.phone.invalid) return;
    this.otpForm.controls.code.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);
    this.otpForm.controls.code.updateValueAndValidity();
    this.otpSent.set(true);
    this.otpMessage.set('Demo verification code: 123456');
  }

  verifyOtp(): void {
    this.otpForm.markAllAsTouched();
    if (this.otpForm.controls.phone.invalid || this.otpForm.controls.code.invalid) return;
    if (this.otpForm.controls.code.value !== '123456') {
      this.otpError.set('That code did not match. Use the demo code shown above.');
      return;
    }
    const phone = this.otpForm.controls.phone.value ?? '';
    if (this.otpPurpose() === 'mobile-login') {
      const result = this.auth.loginWithMobile(phone);
      if (!result.success) {
        this.otpError.set(result.message);
        return;
      }
      const user = this.auth.currentUser();
      if (user) {
        this.deliveryForm.patchValue({ fullName: user.fullName, phone: user.phone, email: user.email });
        if (user.addresses.length) this.selectSavedAddress(user.addresses[0]);
      }
      this.otpError.set('');
      this.checkoutStep.set('delivery');
    } else {
      this.guestMode.set(true);
      this.guestOtpVerified.set(true);
      this.deliveryForm.controls.phone.setValue(phone);
      this.otpError.set('');
      this.checkoutStep.set('payment');
    }
  }

  backToOptions(): void {
    this.checkoutStep.set('entry');
    this.otpPurpose.set(null);
  }

  selectSavedAddress(address: SavedAddress): void {
    this.selectedAddressId.set(address.id);
    this.addressLabel.set(address.label === 'Home' || address.label === 'Office' ? address.label : 'Other');
    this.deliveryForm.patchValue({
      fullName: address.fullName ?? this.auth.currentUser()?.fullName ?? '',
      phone: address.phone ?? this.auth.currentUser()?.phone ?? '',
      email: address.email ?? this.auth.currentUser()?.email ?? '',
      house: address.house ?? '',
      street: address.street ?? address.address,
      landmark: address.landmark ?? '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode
    });
    this.showDeliveryErrors.set(false);
  }

  startNewAddress(): void {
    this.selectedAddressId.set(null);
    this.addressLabel.set('Home');
    this.deliveryForm.patchValue({ house: '', street: '', landmark: '', city: '', state: '', postalCode: '' });
    this.addressMessage.set('');
  }

  saveAddress(): void {
    const addressControls = this.deliveryForm.controls;
    const controls = [addressControls.fullName, addressControls.phone, addressControls.house, addressControls.street, addressControls.city, addressControls.state, addressControls.postalCode];
    controls.forEach((control) => control.markAsTouched());
    if (controls.some((control) => control.invalid)) return;
    const address = this.makeSavedAddress();
    const selectedId = this.selectedAddressId();
    if (selectedId) {
      this.auth.updateAddress(selectedId, address);
      this.addressMessage.set('Saved address updated.');
    } else {
      this.auth.addAddress(address);
      const newAddress = this.auth.currentUser()?.addresses.at(-1);
      this.selectedAddressId.set(newAddress?.id ?? null);
      this.addressMessage.set('Address saved to your account.');
    }
  }

  proceedToPayment(): void {
    this.showDeliveryErrors.set(true);
    this.deliveryForm.markAllAsTouched();
    if (this.deliveryForm.invalid) return;
    if (this.guestMode() && !this.guestOtpVerified()) {
      this.startOtp('guest');
      return;
    }
    this.checkoutStep.set('payment');
    this.paymentError.set('');
  }

  updateCoupon(event: Event): void {
    this.couponInput.set((event.target as HTMLInputElement).value);
  }

  setAddressLabel(event: Event): void {
    this.addressLabel.set((event.target as HTMLSelectElement).value as 'Home' | 'Office' | 'Other');
  }

  setPaymentFailure(event: Event): void {
    this.simulatePaymentFailure.set((event.target as HTMLInputElement).checked);
    this.paymentError.set('');
  }

  applyCoupon(event: SubmitEvent): void {
    event.preventDefault();
    this.cart.applyCoupon(this.couponInput());
  }

  paymentMethodLabel(method: PaymentMethod): string {
    switch (method) {
      case 'cod': return 'Cash on delivery';
      case 'upi': return 'UPI';
      case 'card': return 'Credit / debit card';
      case 'netbanking': return 'Net banking';
    }
  }

  placeOrder(): void {
    if (!this.orderItems().length) {
      this.orderError.set(this.checkoutMode === 'buy-now' ? 'That product is no longer available.' : 'Your bag is empty. Add a saree before checkout.');
      return;
    }
    if (this.paymentMethod() !== 'cod' && this.simulatePaymentFailure()) {
      this.paymentError.set('The demo payment was declined. Your order was not placed and your bag is unchanged.');
      return;
    }
    const orderId = `NM${Date.now().toString().slice(-8)}`;
    const values = this.deliveryForm.getRawValue();
    const address: OrderAddress = {
      fullName: values.fullName ?? '',
      phone: values.phone ?? '',
      email: values.email ?? '',
      house: values.house ?? '',
      street: values.street ?? '',
      landmark: values.landmark ?? '',
      address: [values.house, values.street, values.landmark].filter(Boolean).join(', '),
      city: values.city ?? '',
      state: values.state ?? '',
      postalCode: values.postalCode ?? ''
    };
    const subtotal = this.orderSubtotal();
    const order: StoreOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: this.orderItems(),
      subtotal,
      deliveryFee: this.deliveryFee(),
      discount: this.couponDiscount(),
      total: this.orderTotal(),
      paymentMethod: this.paymentMethod(),
      paymentStatus: this.paymentMethod() === 'cod' ? 'Pending' : 'Demo selected',
      status: 'Placed',
      address
    };
    this.orders.createOrder(order);
    const user = this.auth.currentUser();
    if (user && !this.guestMode()) this.persistDeliveryAddress();
    this.confirmationOrder.set(order);
    if (this.checkoutMode === 'cart') this.storefront.clearCart();
    this.cart.clearCoupon();
    this.paymentError.set('');
  }

  private makeSavedAddress(): Omit<SavedAddress, 'id'> {
    const values = this.deliveryForm.getRawValue();
    const house = values.house ?? '';
    const street = values.street ?? '';
    const landmark = values.landmark ?? '';
    return {
      label: this.addressLabel(),
      fullName: values.fullName ?? '',
      phone: values.phone ?? '',
      email: values.email ?? '',
      house,
      street,
      landmark,
      address: [house, street].filter(Boolean).join(', '),
      city: values.city ?? '',
      state: values.state ?? '',
      postalCode: values.postalCode ?? ''
    };
  }

  private persistDeliveryAddress(): void {
    const savedAddress = this.makeSavedAddress();
    const selectedId = this.selectedAddressId();
    if (selectedId) this.auth.updateAddress(selectedId, savedAddress);
    else this.auth.addAddress(savedAddress);
  }
}
