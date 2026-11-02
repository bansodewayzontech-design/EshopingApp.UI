import {
  StorefrontCategory,
  StorefrontProduct,
  StorefrontPromotion,
  StorefrontTestimonial
} from '../models/storefront.models';

const image = (id: string, width = 900): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const STORE_CATEGORIES: StorefrontCategory[] = [
  { title: 'Paithani Sarees', image: image('photo-1610030469983-98e550d6193c'), anchor: 'featured' },
  { title: 'Banarasi Sarees', image: image('photo-1617627143750-d86bc21e42bb'), anchor: 'featured' },
  { title: 'Silk Sarees', image: image('photo-1610030469983-98e550d6193c'), anchor: 'featured' },
  { title: 'Cotton Sarees', image: image('photo-1594633312681-425c7b97ccd1'), anchor: 'featured' },
  { title: 'Kanjivaram Sarees', image: image('photo-1617627143750-d86bc21e42bb'), anchor: 'featured' },
  { title: 'Designer Sarees', image: image('photo-1515886657613-9f3515b0c78f'), anchor: 'featured' },
  { title: 'Party Wear Sarees', image: image('photo-1595777457583-95e059d581b8'), anchor: 'featured' },
  { title: 'Wedding Sarees', image: image('photo-1610030469983-98e550d6193c'), anchor: 'featured' },
  { title: 'Printed Sarees', image: image('photo-1594633312681-425c7b97ccd1'), anchor: 'featured' }
];

export const STORE_PRODUCTS: StorefrontProduct[] = [
  {
    id: 'saree-01', name: 'Gulabi Banarasi Silk Saree', category: 'Sarees',
    image: image('photo-1610030469983-98e550d6193c', 720), price: 4890, originalPrice: 6990,
    rating: 4.9, reviewCount: 128, badge: 'Bestseller', isNew: false, isBestSeller: true
  },
  {
    id: 'kurti-01', name: 'Mira Handblock Cotton Kurta', category: 'Kurtis',
    image: image('photo-1594633312681-425c7b97ccd1', 720), price: 1490, originalPrice: 2190,
    rating: 4.8, reviewCount: 84, badge: 'New', isNew: true, isBestSeller: false
  },
  {
    id: 'dress-01', name: 'Saanvi Embroidered Anarkali', category: 'Dresses',
    image: image('photo-1595777457583-95e059d581b8', 720), price: 3290, originalPrice: 4590,
    rating: 4.7, reviewCount: 96, badge: 'Bestseller', isNew: false, isBestSeller: true
  },
  {
    id: 'saree-02', name: 'Aabha Chanderi Festive Saree', category: 'Sarees',
    image: image('photo-1617627143750-d86bc21e42bb', 720), price: 3790, originalPrice: 5290,
    rating: 4.8, reviewCount: 62, badge: 'New', isNew: true, isBestSeller: false
  },
  {
    id: 'mens-01', name: 'Arjun Textured Linen Kurta', category: "Men's fashion",
    image: image('photo-1617137968427-85924c800a22', 720), price: 1890, originalPrice: 2490,
    rating: 4.6, reviewCount: 43, badge: null, isNew: false, isBestSeller: true
  },
  {
    id: 'dress-02', name: 'Nila Floral Evening Dress', category: 'Dresses',
    image: image('photo-1515886657613-9f3515b0c78f', 720), price: 2790, originalPrice: 3990,
    rating: 4.7, reviewCount: 71, badge: 'New', isNew: true, isBestSeller: false
  },
  {
    id: 'accessory-01', name: 'Meher Polki Statement Earrings', category: 'Accessories',
    image: image('photo-1611652022419-a9419f74343d', 720), price: 990, originalPrice: 1490,
    rating: 4.9, reviewCount: 152, badge: 'Limited', isNew: false, isBestSeller: true
  },
  {
    id: 'kurti-02', name: 'Ira Hand-Embroidered Co-ord', category: 'Kurtis',
    image: image('photo-1594633312681-425c7b97ccd1', 720), price: 2390, originalPrice: 3190,
    rating: 4.8, reviewCount: 58, badge: 'New', isNew: true, isBestSeller: true
  }
];

export const STORE_PROMOTIONS: StorefrontPromotion[] = [
  {
    eyebrow: 'A season of celebration', title: 'The festive edit',
    description: 'Heirloom-worthy details, made for your brightest moments.',
    image: image('photo-1610030469983-98e550d6193c', 1100), action: 'Explore festive',
    anchor: 'new-arrivals', tone: 'rose'
  },
  {
    eyebrow: 'For the big day', title: 'Wedding stories',
    description: 'Find the piece that feels like it was made for you.',
    image: image('photo-1617627143750-d86bc21e42bb', 1100), action: 'Shop occasionwear',
    anchor: 'featured', tone: 'cream'
  },
  {
    eyebrow: 'Woven with care', title: 'Tradition, reimagined',
    description: 'Artisan textiles with a point of view all their own.',
    image: image('photo-1594633312681-425c7b97ccd1', 1100), action: 'Discover the edit',
    anchor: 'categories', tone: 'wine'
  },
  {
    eyebrow: 'A little something extra', title: 'The occasion sale',
    description: 'Thoughtful finds, now at a little more lovely price.',
    image: image('photo-1595777457583-95e059d581b8', 1100), action: 'View special prices',
    anchor: 'featured', tone: 'gold'
  }
];

export const STORE_TESTIMONIALS: StorefrontTestimonial[] = [
  {
    name: 'Aarohi Desai', location: 'Pune, Maharashtra', initials: 'AD', rating: 5,
    quote: 'The detailing is even more beautiful in person. It arrived carefully packed, and I felt lovely wearing it for my sister\'s wedding.',
    color: 'bg-[#eadbd3]'
  },
  {
    name: 'Meera Nair', location: 'Bengaluru, Karnataka', initials: 'MN', rating: 5,
    quote: 'The fabric feels wonderful and the fit was just right. I have already sent the link to three friends.',
    color: 'bg-[#eadfc5]'
  },
  {
    name: 'Riya Shah', location: 'Ahmedabad, Gujarat', initials: 'RS', rating: 4,
    quote: 'A refreshing collection of pieces that feel special without being difficult to wear. The delivery updates were helpful too.',
    color: 'bg-[#d9e3dc]'
  }
];
