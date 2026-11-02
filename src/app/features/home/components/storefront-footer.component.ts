import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-storefront-footer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './storefront-footer.component.html'
})
export class StorefrontFooterComponent {
  readonly year = new Date().getFullYear();
}
