import { Component, signal } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';

type NewsletterStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section id="newsletter" class="relative overflow-hidden bg-[#6f1d35] px-5 py-14 text-white sm:px-8 sm:py-16">
      <div class="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div class="max-w-xl">
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e2bd9a]">A note from us</p>
          <h2 class="mt-3 font-display text-3xl leading-tight sm:text-4xl">Stay Updated with Latest Collections</h2>
          <p class="mt-2 max-w-lg text-sm leading-6 text-white/75">First looks, thoughtful edits and a little something for your next occasion.</p>
        </div>
        <div class="w-full md:w-[440px]">
          <form class="flex flex-col gap-2 sm:flex-row" novalidate (submit)="subscribe($event)">
            <label class="sr-only" for="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              autocomplete="email"
              inputmode="email"
              [value]="email()"
              (input)="updateEmail($event)"
              aria-required="true"
              aria-describedby="newsletter-feedback"
              placeholder="Your email address"
              class="min-h-12 min-w-0 flex-1 border border-white/35 bg-white px-4 text-sm text-[#292322] outline-none placeholder:text-[#9b8e88] focus:border-[#d3a66d] focus:ring-2 focus:ring-[#d3a66d]"
            />
            <button type="submit" class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#d3a66d] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#321d20] transition hover:bg-[#e1ba88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Subscribe <app-icon name="arrow-right" [size]="16" />
            </button>
          </form>
          <p id="newsletter-feedback" class="mt-2 min-h-5 text-xs text-[#f3dfc5]" aria-live="polite">
            @if (status() === 'success') { Thanks for joining. Watch your inbox for a little inspiration. }
            @else if (status() === 'error') { Please enter a valid email address. }
            @else { No noise, just the occasional lovely thing. }
          </p>
        </div>
      </div>
    </section>
  `
})
export class NewsletterComponent {
  readonly email = signal('');
  readonly status = signal<NewsletterStatus>('idle');

  updateEmail(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
    this.status.set('idle');
  }

  subscribe(event: SubmitEvent): void {
    event.preventDefault();
    const address = this.email().trim();
    this.status.set(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) ? 'success' : 'error');
  }
}
