import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenService = inject(TokenService);

  isAuthenticated(): boolean {
    return this.tokenService.getToken() !== null;
  }

  logout(): void {
    this.tokenService.clearToken();
  }
}
