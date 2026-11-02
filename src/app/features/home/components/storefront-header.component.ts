import { ElementRef, HostListener, Component, computed, inject, input, output, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { STORE_CATEGORIES, STORE_PRODUCTS } from '../data/storefront.data';
import { StorefrontProduct } from '../models/storefront.models';
import { StorefrontStateService } from '../services/storefront-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-storefront-header',
  standalone: true,
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './storefront-header.component.html'
})
export class StorefrontHeaderComponent {
  @ViewChild('categoryPanel') private categoryPanel?: ElementRef<HTMLElement>;
  @ViewChild('searchPanel') private searchPanel?: ElementRef<HTMLElement>;
  @ViewChild('mobileSearchPanel') private mobileSearchPanel?: ElementRef<HTMLElement>;

  readonly searchQuery = input('');
  readonly auth = inject(AuthService);
  readonly searchChange = output<string>();
  readonly productSelected = output<StorefrontProduct>();
  readonly categories = STORE_CATEGORIES;
  readonly categoryMenuOpen = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly searchOpen = signal(false);
  readonly suggestions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const matches = query
      ? STORE_PRODUCTS.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query))
      : STORE_PRODUCTS.slice(0, 3);
    return matches.slice(0, 4);
  });

  constructor(readonly state: StorefrontStateService, private readonly router: Router) {}

  onSearch(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
    this.searchOpen.set(true);
  }

  clearSearch(): void {
    this.searchChange.emit('');
    this.searchOpen.set(false);
  }

  selectSuggestion(product: StorefrontProduct): void {
    this.searchChange.emit(product.name);
    this.productSelected.emit(product);
    this.searchOpen.set(false);
    this.mobileMenuOpen.set(false);
  }

  submitSearch(event: SubmitEvent): void {
    event.preventDefault();
    this.searchOpen.set(false);
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleCategoryMenu(): void {
    this.categoryMenuOpen.update((open) => !open);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  selectCategory(category: string): void {
    this.categoryMenuOpen.set(false);
    void this.router.navigate(['/categories', category.toLowerCase().replace(/\s+/g, '-')]);
  }

  @HostListener('document:click', ['$event'])
  closeSearchOnOutsideClick(event: MouseEvent): void {
    const target = event.target as Node;
    const desktopContainsTarget = this.searchPanel?.nativeElement.contains(target) ?? false;
    const mobileContainsTarget = this.mobileSearchPanel?.nativeElement.contains(target) ?? false;
    if (!desktopContainsTarget && !mobileContainsTarget) {
      this.searchOpen.set(false);
    }

    if (!this.categoryPanel?.nativeElement.contains(target)) {
      this.categoryMenuOpen.set(false);
    }
  }

  @HostListener('window:scroll')
  closeCategoryMenuOnScroll(): void {
    this.categoryMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  closeMenusOnEscape(): void {
    this.searchOpen.set(false);
    this.categoryMenuOpen.set(false);
    this.mobileMenuOpen.set(false);
  }
}
