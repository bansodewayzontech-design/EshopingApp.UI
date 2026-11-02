import { Injectable, computed, signal } from '@angular/core';
import { StoreOrder } from '../models/order.models';

const ORDERS_STORAGE_KEY = 'eshoping-orders-v1';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  readonly orders = signal<StoreOrder[]>(this.readOrders());
  readonly sortedOrders = computed(() => [...this.orders()].sort((left, right) => right.createdAt.localeCompare(left.createdAt)));

  createOrder(order: StoreOrder): void {
    this.orders.update((orders) => {
      const next = [order, ...orders];
      this.writeOrders(next);
      return next;
    });
  }

  cancelOrder(orderId: string): boolean {
    const order = this.orders().find((item) => item.id === orderId);
    if (!order || (order.status !== 'Placed' && order.status !== 'Processing')) return false;
    this.orders.update((orders) => {
      const next = orders.map((item) => item.id === orderId ? { ...item, status: 'Cancelled' as const } : item);
      this.writeOrders(next);
      return next;
    });
    return true;
  }

  private readOrders(): StoreOrder[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const value: unknown = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) ?? '[]');
      return Array.isArray(value) ? value as StoreOrder[] : [];
    } catch {
      return [];
    }
  }

  private writeOrders(orders: StoreOrder[]): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      return;
    }
  }
}
