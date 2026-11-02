import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, RouterLink, IconComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  readonly orders = inject(OrdersService);
  readonly feedback = signal('');
  readonly trackingOrderId = signal<string | null>(null);

  toggleTracking(orderId: string): void {
    this.trackingOrderId.update((currentId) => currentId === orderId ? null : orderId);
  }

  cancelOrder(orderId: string): void {
    this.feedback.set(this.orders.cancelOrder(orderId) ? 'Order cancelled in this demo.' : 'This order can no longer be cancelled.');
  }
}
