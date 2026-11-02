import { CartLineItem } from '../../home/models/storefront.models';

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Demo selected';

export interface OrderAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  email?: string;
  house?: string;
  street?: string;
  landmark?: string;
}

export interface StoreOrder {
  id: string;
  createdAt: string;
  items: CartLineItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking';
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  address: OrderAddress;
}
