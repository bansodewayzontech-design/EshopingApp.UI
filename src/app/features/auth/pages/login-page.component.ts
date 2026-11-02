import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly showPassword = signal(false);
  readonly errorMessage = signal('');

  login(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const result = this.auth.login(String(fields.get('email') ?? ''), String(fields.get('password') ?? ''));
    if (!result.success) {
      this.errorMessage.set(result.message);
      return;
    }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/profile';
    void this.router.navigateByUrl(returnUrl);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }
}
