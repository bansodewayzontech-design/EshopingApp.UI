import { Component, input, output } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-video-actions',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="flex flex-col items-center gap-4 text-white">
      <button type="button" (click)="like.emit()" [attr.aria-pressed]="liked()" [attr.aria-label]="liked() ? 'Unlike saree' : 'Like saree'" class="grid h-11 w-11 place-items-center rounded-full bg-black/35 backdrop-blur-sm transition hover:bg-black/55">
        <app-icon name="heart" [size]="22" [class.fill-current]="liked()" [class.text-rose-400]="liked()" />
      </button>
      <span class="-mt-3 text-[9px] font-semibold uppercase tracking-wider">{{ liked() ? 'Liked' : 'Like' }}</span>
      <button type="button" (click)="share.emit()" aria-label="Share this saree" class="grid h-11 w-11 place-items-center rounded-full bg-black/35 backdrop-blur-sm transition hover:bg-black/55">
        <span class="text-lg leading-none" aria-hidden="true">↗</span>
      </button>
      <span class="-mt-3 text-[9px] font-semibold uppercase tracking-wider">Share</span>
      <button type="button" (click)="details.emit()" aria-label="View saree details" class="grid h-11 w-11 place-items-center rounded-full bg-black/35 backdrop-blur-sm transition hover:bg-black/55">
        <app-icon name="arrow-up-right" [size]="20" />
      </button>
      <span class="-mt-3 text-[9px] font-semibold uppercase tracking-wider">Details</span>
    </div>
    <div class="mt-5 grid gap-2">
      <button type="button" (click)="buy.emit()" class="min-h-11 bg-[#f0c178] px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#351d20] transition hover:bg-[#ffdda0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Buy now</button>
      <button type="button" (click)="add.emit()" class="min-h-11 border border-white/80 bg-black/20 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#351d20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Add to cart</button>
    </div>
  `
})
export class VideoActionsComponent {
  readonly liked = input(false);
  readonly like = output<void>();
  readonly share = output<void>();
  readonly details = output<void>();
  readonly buy = output<void>();
  readonly add = output<void>();
}
