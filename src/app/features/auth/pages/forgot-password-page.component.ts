import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './forgot-password-page.component.html'
})
export class ForgotPasswordPageComponent {
  private readonly auth = inject(AuthService);
  readonly message = signal('');

  requestReset(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    const email = String(new FormData(form).get('email') ?? '');
    this.message.set(this.auth.requestPasswordReset(email));
  }
}
