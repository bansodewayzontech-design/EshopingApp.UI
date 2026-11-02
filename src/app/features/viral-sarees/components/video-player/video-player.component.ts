import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, output, signal, ViewChild } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) videoUrl = '';
  @Input({ required: true }) posterUrl = '';
  @Input() active = false;
  @Input() muted = true;
  readonly muteToggle = output<void>();
  readonly playing = signal(false);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly progress = signal(0);
  @ViewChild('videoElement') private videoElement?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.syncPlayback();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.syncPlayback();
  }

  togglePlayback(): void {
    const video = this.videoElement?.nativeElement;
    if (!video || this.failed()) return;
    if (video.paused) {
      void video.play().then(() => this.playing.set(true)).catch(() => this.loading.set(false));
    } else {
      video.pause();
      this.playing.set(false);
    }
  }

  updateProgress(event: Event): void {
    const video = event.target as HTMLVideoElement;
    this.progress.set(video.duration ? (video.currentTime / video.duration) * 100 : 0);
  }

  setReady(): void {
    this.loading.set(false);
    this.failed.set(false);
    this.syncPlayback();
  }

  setFailed(): void {
    this.loading.set(false);
    this.failed.set(true);
    this.playing.set(false);
  }

  private syncPlayback(): void {
    const video = this.videoElement?.nativeElement;
    if (!video) return;
    video.muted = this.muted;
    if (this.active && !this.failed()) {
      if (video.paused) {
        this.loading.set(true);
        void video.play().then(() => this.playing.set(true)).catch(() => {
          this.playing.set(false);
          this.loading.set(false);
        });
      }
      return;
    }
    video.pause();
    video.currentTime = 0;
    this.playing.set(false);
    this.progress.set(0);
  }
}
