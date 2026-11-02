import { Injectable, computed, signal } from '@angular/core';
import { CartLineItem, StorefrontProduct } from '../models/storefront.models';

const CART_STORAGE_KEY = 'eshoping-cart-v1';
const WISHLIST_STORAGE_KEY = 'eshoping-wishlist-v1';

@Injectable({ providedIn: 'root' })
export class StorefrontStateService {
  readonly cartItems = signal<CartLineItem[]>(this.readStorage<CartLineItem>(CART_STORAGE_KEY));
  readonly cartCount = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));
  readonly cartSubtotal = computed(() => this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0));
  readonly wishlistProducts = signal<StorefrontProduct[]>(this.readStorage<StorefrontProduct>(WISHLIST_STORAGE_KEY));
  readonly wishlistIds = computed(() => new Set(this.wishlistProducts().map((product) => product.id)));
  readonly wishlistCount = computed(() => this.wishlistProducts().length);
  readonly deliveryFee = computed(() => this.cartSubtotal() === 0 || this.cartSubtotal() >= 2999 ? 0 : 99);
  readonly cartTotal = computed(() => this.cartSubtotal() + this.deliveryFee());
  readonly toastMessage = signal<string | null>(null);

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  addToCart(product: StorefrontProduct, quantity = 1): void {
    const itemQuantity = Math.min(20, Math.max(1, Math.floor(quantity)));
    this.cartItems.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      const next = existing
        ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + itemQuantity } : item)
        : [...items, { product, quantity: itemQuantity }];
      this.writeStorage(CART_STORAGE_KEY, next);
      return next;
    });
    this.showToast(`${product.name} added to your bag`);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update((items) => {
      const next = items.map((item) => item.product.id === productId ? { ...item, quantity } : item);
      this.writeStorage(CART_STORAGE_KEY, next);
      return next;
    });
  }

  removeFromCart(productId: string): void {
    this.cartItems.update((items) => {
      const next = items.filter((item) => item.product.id !== productId);
      this.writeStorage(CART_STORAGE_KEY, next);
      return next;
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.writeStorage(CART_STORAGE_KEY, []);
  }

  notify(message: string): void {
    this.showToast(message);
  }

  toggleWishlist(product: StorefrontProduct): void {
    this.wishlistProducts.update((products) => {
      const exists = products.some((item) => item.id === product.id);
      const next = exists
        ? products.filter((item) => item.id !== product.id)
        : [...products, product];
      this.writeStorage(WISHLIST_STORAGE_KEY, next);
      if (exists) {
        this.showToast('Removed from your wishlist');
      } else {
        this.showToast('Saved to your wishlist');
      }
      return next;
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistProducts.update((products) => {
      const next = products.filter((product) => product.id !== productId);
      this.writeStorage(WISHLIST_STORAGE_KEY, next);
      return next;
    });
  }

  isWishlisted(productId: string): boolean {
    return this.wishlistIds().has(productId);
  }

  dismissToast(): void {
    this.toastMessage.set(null);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => this.toastMessage.set(null), 3200);
  }

  private readStorage<T>(key: string): T[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
      return Array.isArray(value) ? value as T[] : [];
    } catch {
      return [];
    }
  }

  private writeStorage<T>(key: string, value: T[]): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      this.showToast('Could not save your changes on this device');
    }
  }
}
