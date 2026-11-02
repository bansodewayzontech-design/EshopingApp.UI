import { Component, input } from '@angular/core';

export type IconName =
  | 'search' | 'heart' | 'bag' | 'user' | 'menu' | 'close' | 'chevron-down'
  | 'arrow-right' | 'arrow-up-right' | 'star' | 'lock' | 'truck' | 'return'
  | 'check' | 'instagram' | 'facebook' | 'youtube' | 'sparkles' | 'shield-check'
  | 'mail' | 'plus' | 'minus' | 'play' | 'flame' | 'arrow-left' | 'home';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="block shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name()) {
        @case ('search') { <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /> }
        @case ('heart') { <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /> }
        @case ('bag') { <path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /> }
        @case ('user') { <circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /> }
        @case ('menu') { <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /> }
        @case ('close') { <path d="m18 6-12 12" /><path d="m6 6 12 12" /> }
        @case ('chevron-down') { <path d="m6 9 6 6 6-6" /> }
        @case ('arrow-right') { <path d="M5 12h14" /><path d="m12 5 7 7-7 7" /> }
        @case ('arrow-left') { <path d="M19 12H5" /><path d="m12 19-7-7 7-7" /> }
        @case ('home') { <path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9" /><path d="M9 21v-7h6v7" /> }
        @case ('arrow-up-right') { <path d="M7 17 17 7" /><path d="M7 7h10v10" /> }
        @case ('star') { <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" /> }
        @case ('lock') { <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /> }
        @case ('truck') { <path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /> }
        @case ('return') { <path d="M3 11a9 9 0 1 1 2.6 6.4" /><path d="M3 4v7h7" /> }
        @case ('check') { <path d="m5 12 4 4L19 6" /> }
        @case ('instagram') { <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /> }
        @case ('facebook') { <path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h1.7V1.4A22 22 0 0 0 16.2 1C13.7 1 12 2.5 12 5.3V9H9v4h3v8" /> }
        @case ('youtube') { <rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" /> }
        @case ('sparkles') { <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 14 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /> }
        @case ('flame') { <path d="M8.5 14.5A4.5 4.5 0 0 0 13 19a4.5 4.5 0 0 0 4.5-4.5c0-2.5-1.5-4-3-5.5-.7 2-1.8 2.7-2.5 3-1-3-1.5-5-1-8-3 2-5 5.7-5 9.5A7 7 0 0 0 13 21a7 7 0 0 0 7-7" /> }
        @case ('shield-check') { <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /> }
        @case ('mail') { <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /> }
        @case ('plus') { <path d="M12 5v14" /><path d="M5 12h14" /> }
        @case ('minus') { <path d="M5 12h14" /> }
        @case ('play') { <path d="m9 6 10 6-10 6V6Z" /> }
      }
    </svg>
  `
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}
