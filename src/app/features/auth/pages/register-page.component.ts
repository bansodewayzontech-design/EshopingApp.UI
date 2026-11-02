import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly showPassword = signal(false);
  readonly errorMessage = signal('');

  register(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const password = String(fields.get('password') ?? '');
    const confirmPassword = String(fields.get('confirmPassword') ?? '');
    if (password !== confirmPassword) {
      this.errorMessage.set('Your passwords do not match.');
      return;
    }
    const result = this.auth.register(
      String(fields.get('fullName') ?? ''),
      String(fields.get('email') ?? ''),
      String(fields.get('phone') ?? '')
    );
    if (!result.success) {
      this.errorMessage.set(result.message);
      return;
    }
    void this.router.navigate(['/profile']);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }
}
