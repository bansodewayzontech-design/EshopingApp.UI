import { ViralSareeVideo } from '../models/viral-sarees.models';

const sampleVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const image = (id: string): string => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`;

export const VIRAL_SAREE_VIDEOS: ViralSareeVideo[] = [
  {
    videoId: 'reel-paithani-sunrise', productId: 'viral-paithani-01',
    productName: 'Morpankh Paithani Silk Saree', videoUrl: sampleVideo,
    thumbnailUrl: image('photo-1610030469983-98e550d6193c'), originalPrice: 12490,
    offerPrice: 8490, discountPercentage: 32, rating: 4.9, isViral: true,
    description: 'A luminous Paithani-inspired drape with a rich woven border for celebrations that stay with you.'
  },
  {
    videoId: 'reel-banarasi-rose', productId: 'viral-banarasi-02',
    productName: 'Gulnaar Banarasi Brocade Saree', videoUrl: sampleVideo,
    thumbnailUrl: image('photo-1617627143750-d86bc21e42bb'), originalPrice: 9990,
    offerPrice: 6990, discountPercentage: 30, rating: 4.8, isViral: true,
    description: 'A graceful brocade finish in a festive rose tone, made for weddings and treasured occasions.'
  },
  {
    videoId: 'reel-kanjivaram-gold', productId: 'viral-kanjivaram-03',
    productName: 'Aadhya Kanjivaram Silk Saree', videoUrl: sampleVideo,
    thumbnailUrl: image('photo-1594633312681-425c7b97ccd1'), originalPrice: 15990,
    offerPrice: 11990, discountPercentage: 25, rating: 4.9, isViral: true,
    description: 'A statement silk silhouette with a traditional gold-toned border and heirloom-inspired detailing.'
  },
  {
    videoId: 'reel-chanderi-evening', productId: 'viral-chanderi-04',
    productName: 'Noor Chanderi Festive Saree', videoUrl: sampleVideo,
    thumbnailUrl: image('photo-1595777457583-95e059d581b8'), originalPrice: 7490,
    offerPrice: 4990, discountPercentage: 33, rating: 4.7, isViral: true,
    description: 'Lightweight Chanderi texture and delicate festive accents for effortless all-day elegance.'
  }
];
