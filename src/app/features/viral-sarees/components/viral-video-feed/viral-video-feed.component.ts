import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, QueryList, ViewChildren } from '@angular/core';
import { VideoActionsComponent } from '../video-actions/video-actions.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { VideoProductInfoComponent } from '../video-product-info/video-product-info.component';
import { ViralSareeVideo } from '../../models/viral-sarees.models';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-viral-video-feed',
  standalone: true,
  imports: [IconComponent, VideoActionsComponent, VideoPlayerComponent, VideoProductInfoComponent],
  templateUrl: './viral-video-feed.component.html'
})
export class ViralVideoFeedComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) videos: ViralSareeVideo[] = [];
  @Input() activeIndex = 0;
  @Input() muted = true;
  @Input() isLiked: (productId: string) => boolean = () => false;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() muteToggle = new EventEmitter<void>();
  @Output() like = new EventEmitter<ViralSareeVideo>();
  @Output() share = new EventEmitter<ViralSareeVideo>();
  @Output() details = new EventEmitter<ViralSareeVideo>();
  @Output() buy = new EventEmitter<ViralSareeVideo>();
  @Output() add = new EventEmitter<ViralSareeVideo>();
  @ViewChildren('feedCard') private feedCards?: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;
  private lastWheelNavigation = 0;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      const mostVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      const index = Number((mostVisible?.target as HTMLElement | undefined)?.dataset['index']);
      if (Number.isInteger(index)) this.activeIndexChange.emit(index);
    }, { threshold: [0.55, 0.72, 0.9] });
    this.observeCards();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  navigateTo(index: number): void {
    const boundedIndex = Math.max(0, Math.min(index, this.videos.length - 1));
    this.activeIndexChange.emit(boundedIndex);
    this.feedCards?.get(boundedIndex)?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onWheel(event: WheelEvent): void {
    if (Math.abs(event.deltaY) < 24 || Date.now() - this.lastWheelNavigation < 550) return;
    event.preventDefault();
    this.lastWheelNavigation = Date.now();
    this.navigateTo(this.activeIndex + (event.deltaY > 0 ? 1 : -1));
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    this.navigateTo(this.activeIndex + (event.key === 'ArrowDown' ? 1 : -1));
  }

  private observeCards(): void {
    if (!this.observer) return;
    this.feedCards?.forEach((card) => this.observer?.observe(card.nativeElement));
  }
}
