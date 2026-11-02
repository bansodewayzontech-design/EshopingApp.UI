import { Injectable, computed, inject, signal } from '@angular/core';
import { StorefrontStateService } from '../../home/services/storefront-state.service';
import { StorefrontProduct } from '../../home/models/storefront.models';
import { VIRAL_SAREE_VIDEOS } from '../data/viral-sarees.data';
import { ViralSareeVideo } from '../models/viral-sarees.models';

@Injectable({ providedIn: 'root' })
export class ViralSareesService {
	private readonly storefrontState = inject(StorefrontStateService);
	readonly videos = signal(VIRAL_SAREE_VIDEOS);
	readonly activeIndex = signal(0);
	readonly isMuted = signal(true);
	readonly activeVideo = computed(() => this.videos()[this.activeIndex()] ?? null);
	readonly isLiked = (productId: string): boolean => this.storefrontState.isWishlisted(productId);

	setActiveIndex(index: number): void {
		this.activeIndex.set(Math.max(0, Math.min(index, this.videos().length - 1)));
	}

	toggleMute(): void {
		this.isMuted.update((muted) => !muted);
	}

	toggleLike(video: ViralSareeVideo): void {
		this.storefrontState.toggleWishlist(this.toStorefrontProduct(video));
	}

	addToCart(video: ViralSareeVideo): void {
		this.storefrontState.addToCart(this.toStorefrontProduct(video));
	}

	productForCheckout(productId: string): StorefrontProduct | null {
		const video = this.videos().find((item) => item.productId === productId);
		return video ? this.toStorefrontProduct(video) : null;
	}

	private toStorefrontProduct(video: ViralSareeVideo): StorefrontProduct {
		return {
			id: video.productId,
			name: video.productName,
			category: 'Sarees',
			image: video.thumbnailUrl,
			price: video.offerPrice,
			originalPrice: video.originalPrice,
			rating: video.rating,
			reviewCount: 0,
			badge: 'Bestseller',
			isNew: false,
			isBestSeller: true
		};
	}
}
