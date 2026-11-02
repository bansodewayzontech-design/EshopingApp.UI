export interface CatalogReview {
  name: string;
  rating: number;
  comment: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge: 'New' | 'Bestseller' | 'Limited' | null;
  isNew: boolean;
  isBestSeller: boolean;
  fabric: string;
  color: string;
  description: string;
  length: string;
  blouse: string;
  stock: number;
  reviews: CatalogReview[];
}

export interface CatalogFilters {
  category: string | null;
  priceLimit: number;
  minimumDiscount: number;
  minimumRating: number;
  fabric: string | null;
  color: string | null;
}
