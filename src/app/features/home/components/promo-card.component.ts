import { Component, input } from '@angular/core';
import { StorefrontPromotion } from '../models/storefront.models';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-promo-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <a
      [href]="'#' + promotion().anchor"
      [attr.aria-label]="promotion().action + ': ' + promotion().title"
      class="group relative block min-h-[310px] overflow-hidden bg-[#413536] sm:min-h-[380px]"
    >
      <img
        [src]="promotion().image"
        [alt]="promotion().title + ' collection'"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">{{ promotion().eyebrow }}</p>
        <h3 class="mt-2 font-display text-3xl leading-tight sm:text-4xl">{{ promotion().title }}</h3>
        <p class="mt-2 max-w-sm text-sm leading-6 text-white/85">{{ promotion().description }}</p>
        <span class="mt-5 inline-flex items-center gap-2 border-b border-white/70 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
          {{ promotion().action }} <app-icon name="arrow-right" [size]="15" />
        </span>
      </div>
    </a>
  `
})
export class PromoCardComponent {
  readonly promotion = input.required<StorefrontPromotion>();
}
