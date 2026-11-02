export interface StorefrontCategory {
  title: string;
  image: string;
  anchor: string;
}

export interface StorefrontProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge: 'New' | 'Bestseller' | 'Limited' | null;
  isNew: boolean;
  isBestSeller: boolean;
}

export interface CartLineItem {
  product: StorefrontProduct;
  quantity: number;
}

export interface StorefrontPromotion {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  action: string;
  anchor: string;
  tone: 'rose' | 'cream' | 'wine' | 'gold';
}

export interface StorefrontTestimonial {
  name: string;
  location: string;
  initials: string;
  rating: number;
  quote: string;
  color: string;
}
