import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ProductCardComponent } from '../../home/components/product-card.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';
import { StorefrontProduct } from '../../home/models/storefront.models';
import { StorefrontStateService } from '../../home/services/storefront-state.service';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [RouterLink, IconComponent, ProductCardComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './wishlist-page.component.html'
})
export class WishlistPageComponent {
  readonly storefront = inject(StorefrontStateService);
  private readonly router = inject(Router);

  openDetails(product: StorefrontProduct): void {
    void this.router.navigate(['/products', product.id]);
  }
}
