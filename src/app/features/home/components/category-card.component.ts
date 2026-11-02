import { Component, input, output } from '@angular/core';
import { StorefrontCategory } from '../models/storefront.models';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <a
      [href]="'#' + category().anchor"
      [attr.aria-label]="'Explore ' + category().title"
      (click)="$event.preventDefault(); categorySelected.emit(category().title)"
      class="group block"
    >
      <div class="relative aspect-[4/5] overflow-hidden bg-[#eee8e0]">
        <img
          [src]="category().image"
          [alt]="category().title + ' collection'"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div class="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-12 text-white sm:px-5 sm:pb-5">
          <span class="font-display text-2xl leading-none sm:text-3xl">{{ category().title }}</span>
          <span class="grid h-9 w-9 place-items-center border border-white/60 transition-colors group-hover:bg-white group-hover:text-[#6f1d35]" aria-hidden="true">
            <app-icon name="arrow-up-right" [size]="17" />
          </span>
        </div>
      </div>
    </a>
  `
})
export class CategoryCardComponent {
  readonly category = input.required<StorefrontCategory>();
  readonly categorySelected = output<string>();
}
