import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { StorefrontFooterComponent } from '../../home/components/storefront-footer.component';
import { StorefrontHeaderComponent } from '../../home/components/storefront-header.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IconComponent, StorefrontHeaderComponent, StorefrontFooterComponent],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly fullName = signal(this.auth.currentUser()?.fullName ?? '');
  readonly phone = signal(this.auth.currentUser()?.phone ?? '');
  readonly addressLabel = signal('Home');
  readonly address = signal('');
  readonly city = signal('');
  readonly state = signal('');
  readonly postalCode = signal('');
  readonly feedback = signal('');

  updateField(field: 'fullName' | 'phone', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (field === 'fullName') this.fullName.set(value);
    else this.phone.set(value);
  }

  saveProfile(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    this.auth.updateProfile({ fullName: this.fullName().trim(), phone: this.phone().trim() });
    this.feedback.set('Your profile has been saved on this device.');
  }

  updateAddress(field: 'addressLabel' | 'address' | 'city' | 'state' | 'postalCode', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    switch (field) {
      case 'addressLabel': this.addressLabel.set(value); break;
      case 'address': this.address.set(value); break;
      case 'city': this.city.set(value); break;
      case 'state': this.state.set(value); break;
      case 'postalCode': this.postalCode.set(value); break;
    }
  }

  addAddress(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    this.auth.addAddress({
      label: this.addressLabel().trim(), address: this.address().trim(), city: this.city().trim(),
      state: this.state().trim(), postalCode: this.postalCode().trim()
    });
    this.address.set('');
    this.city.set('');
    this.state.set('');
    this.postalCode.set('');
    this.feedback.set('Address saved on this device.');
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/auth/login']);
  }
}
