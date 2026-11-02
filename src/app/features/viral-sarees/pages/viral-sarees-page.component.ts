import { Component, HostListener, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontStateService } from '../../home/services/storefront-state.service';
import { ViralVideoFeedComponent } from '../components/viral-video-feed/viral-video-feed.component';
import { ViralSareesService } from '../services/viral-sarees.service';
import { ViralSareeVideo } from '../models/viral-sarees.models';

@Component({
  selector: 'app-viral-sarees-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IconComponent, ViralVideoFeedComponent],
  templateUrl: './viral-sarees-page.component.html'
})
export class ViralSareesPageComponent {
  readonly viralStore = inject(ViralSareesService);
  readonly storefrontState = inject(StorefrontStateService);
  readonly detailsVideo = signal<ViralSareeVideo | null>(null);

  constructor() {
    const requestedVideoId = inject(ActivatedRoute).snapshot.queryParamMap.get('video');
    const requestedIndex = this.viralStore.videos().findIndex((video) => video.videoId === requestedVideoId);
    if (requestedIndex >= 0) this.viralStore.setActiveIndex(requestedIndex);
  }

  async shareVideo(video: ViralSareeVideo): Promise<void> {
    const url = `${window.location.origin}/viral-sarees?video=${encodeURIComponent(video.videoId)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: video.productName, text: video.description, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        this.storefrontState.notify('Video link copied to clipboard');
      } else {
        this.storefrontState.notify(url);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      this.storefrontState.notify('Unable to share this video right now');
    }
  }

  buyNow(video: ViralSareeVideo): void {
    this.detailsVideo.set(video);
  }

  @HostListener('document:keydown.escape')
  closeDetails(): void {
    this.detailsVideo.set(null);
  }
}
