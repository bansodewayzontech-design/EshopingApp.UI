import { CatalogProduct } from '../models/catalog.models';

const image = (id: string, width = 900): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const makeSaree = (
  id: string,
  name: string,
  category: string,
  imageId: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  fabric: string,
  color: string,
  badge: CatalogProduct['badge'],
  isNew: boolean,
  isBestSeller: boolean,
  stock: number
): CatalogProduct => ({
  id, name, category,
  image: image(imageId, 900),
  images: [image(imageId, 1100), image(imageId, 900), image('photo-1617627143750-d86bc21e42bb', 900)],
  price, originalPrice, rating, reviewCount, fabric, color, badge, isNew, isBestSeller, stock,
  description: `A thoughtfully finished ${fabric.toLowerCase()} saree in ${color.toLowerCase()}, designed for celebrations and everyday moments alike.`,
  length: '5.5 metres',
  blouse: 'Unstitched blouse piece included',
  reviews: [
    { name: 'Aarohi D.', rating: 5, comment: 'The colour and detailing are beautiful. It arrived carefully packed and feels lovely to wear.' },
    { name: 'Meera N.', rating: 4, comment: 'A graceful drape with a soft feel. The product looked just like the photos.' },
    { name: 'Riya S.', rating: 5, comment: 'A wonderful choice for a family celebration. The finish feels thoughtfully made.' }
  ]
});

export const SAREE_CATEGORIES = [
  'Paithani Sarees', 'Banarasi Sarees', 'Silk Sarees', 'Cotton Sarees',
  'Kanjivaram Sarees', 'Designer Sarees', 'Party Wear Sarees', 'Wedding Sarees',
  'Printed Sarees'
] as const;

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  makeSaree('paithani-morpankh', 'Morpankh Paithani Silk Saree', 'Paithani Sarees', 'photo-1610030469983-98e550d6193c', 8490, 12490, 4.9, 128, 'Silk', 'Peacock Blue', 'Bestseller', false, true, 7),
  makeSaree('banarasi-gulnaar', 'Gulnaar Banarasi Brocade Saree', 'Banarasi Sarees', 'photo-1617627143750-d86bc21e42bb', 6990, 9990, 4.8, 92, 'Brocade', 'Crimson', 'New', true, true, 5),
  makeSaree('kanjivaram-aadhya', 'Aadhya Kanjivaram Silk Saree', 'Kanjivaram Sarees', 'photo-1610030469983-98e550d6193c', 11990, 15990, 4.9, 76, 'Silk', 'Gold', 'Bestseller', false, true, 4),
  makeSaree('chanderi-noor', 'Noor Chanderi Festive Saree', 'Party Wear Sarees', 'photo-1595777457583-95e059d581b8', 4990, 7490, 4.7, 61, 'Chanderi', 'Rose', 'New', true, false, 12),
  makeSaree('cotton-meher', 'Meher Handblock Cotton Saree', 'Cotton Sarees', 'photo-1594633312681-425c7b97ccd1', 2290, 3290, 4.6, 48, 'Cotton', 'Indigo', null, false, false, 18),
  makeSaree('designer-zarika', 'Zarika Embroidered Designer Saree', 'Designer Sarees', 'photo-1515886657613-9f3515b0c78f', 9590, 14990, 4.8, 83, 'Georgette', 'Wine', 'Limited', false, true, 3),
  makeSaree('wedding-rajshree', 'Rajshree Wedding Silk Saree', 'Wedding Sarees', 'photo-1617627143750-d86bc21e42bb', 13990, 19990, 4.9, 114, 'Silk', 'Ruby Red', 'Bestseller', false, true, 5),
  makeSaree('printed-kesar', 'Kesar Floral Printed Saree', 'Printed Sarees', 'photo-1594633312681-425c7b97ccd1', 1490, 2990, 4.5, 39, 'Cotton', 'Mustard', 'New', true, false, 21),
  makeSaree('silk-vanya', 'Vanya Soft Silk Occasion Saree', 'Silk Sarees', 'photo-1610030469983-98e550d6193c', 6290, 8990, 4.7, 67, 'Silk', 'Emerald', null, false, true, 9),
  makeSaree('banarasi-rang', 'Rang Mahal Banarasi Silk Saree', 'Banarasi Sarees', 'photo-1617627143750-d86bc21e42bb', 10990, 16990, 4.9, 102, 'Brocade', 'Magenta', 'Limited', false, true, 2),
  makeSaree('paithani-kamal', 'Kamal Buta Paithani Saree', 'Paithani Sarees', 'photo-1610030469983-98e550d6193c', 7890, 11990, 4.8, 56, 'Silk', 'Purple', 'New', true, false, 8),
  makeSaree('party-ira', 'Ira Sequin Party Wear Saree', 'Party Wear Sarees', 'photo-1595777457583-95e059d581b8', 4990, 9990, 4.6, 44, 'Georgette', 'Black', 'Limited', false, false, 6)
];
