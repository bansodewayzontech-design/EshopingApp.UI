import { Component, input } from '@angular/core';
import { StorefrontTestimonial } from '../models/storefront.models';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <article class="flex h-full flex-col border border-[#eee5df] bg-white p-5 sm:p-6">
      <div class="flex gap-1 text-[#a87237]" [attr.aria-label]="testimonial().rating + ' out of 5 stars'">
        @for (star of stars; track star) {
          <app-icon name="star" [size]="14" [class.fill-current]="star <= testimonial().rating" />
        }
      </div>
      <blockquote class="mt-4 flex-1 font-display text-xl leading-relaxed text-[#3b302e]">
        “{{ testimonial().quote }}”
      </blockquote>
      <div class="mt-6 flex items-center gap-3 border-t border-[#eee5df] pt-4">
        <div [class]="'grid h-10 w-10 place-items-center rounded-full text-xs font-semibold text-[#5b3e39] ' + testimonial().color" aria-hidden="true">
          {{ testimonial().initials }}
        </div>
        <div>
          <p class="text-sm font-semibold text-[#302927]">{{ testimonial().name }}</p>
          <p class="mt-0.5 text-xs text-[#8c7770]">{{ testimonial().location }}</p>
        </div>
      </div>
    </article>
  `
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<StorefrontTestimonial>();
  readonly stars = [1, 2, 3, 4, 5];
}
