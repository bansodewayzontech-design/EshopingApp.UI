import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ViralSareeVideo } from '../../models/viral-sarees.models';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-video-product-info',
  standalone: true,
  imports: [CurrencyPipe, IconComponent],
  template: `
    <div class="max-w-[min(100%,340px)] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
      <p class="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4d18c]">
        <app-icon name="star" [size]="13" class="fill-current" /> {{ video().rating.toFixed(1) }} <span class="text-white/70">·</span> Free delivery
      </p>
      <h2 class="mt-2 font-display text-2xl leading-tight sm:text-3xl">{{ video().productName }}</h2>
      <p class="mt-2 line-clamp-2 text-xs leading-5 text-white/85">{{ video().description }}</p>
      <div class="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span class="text-xl font-semibold">{{ video().offerPrice | currency:'INR':'symbol':'1.0-0' }}</span>
        <span class="text-sm text-white/70 line-through">{{ video().originalPrice | currency:'INR':'symbol':'1.0-0' }}</span>
        <span class="text-[10px] font-bold uppercase tracking-wide text-[#ffe0a2]">{{ video().discountPercentage }}% off</span>
      </div>
    </div>
  `
})
export class VideoProductInfoComponent {
  readonly video = input.required<ViralSareeVideo>();
}
