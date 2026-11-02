import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthUser, SavedAddress } from '../models/auth.models';
import { TokenService } from './token.service';

const USER_STORAGE_KEY = 'eshoping-user-v1';

export interface AuthResult {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenService = inject(TokenService);
  readonly currentUser = signal<AuthUser | null>(this.readUser());
  readonly isLoggedIn = computed(() => this.currentUser() !== null && this.tokenService.getToken() !== null);

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  login(emailValue: string, password: string): AuthResult {
    const email = emailValue.trim().toLowerCase();
    if (!email || !password.trim()) return { success: false, message: 'Enter your email and password.' };
    const savedUser = this.readUser();
    const user = savedUser?.email === email
      ? savedUser
      : { id: `guest-${Date.now()}`, fullName: this.nameFromEmail(email), email, phone: '', addresses: [] };
    this.persistUser(user);
    this.tokenService.setToken(`demo-${Date.now()}`);
    this.currentUser.set(user);
    return { success: true, message: 'You are signed in.' };
  }

  register(fullName: string, emailValue: string, phone: string): AuthResult {
    const email = emailValue.trim().toLowerCase();
    if (!fullName.trim() || !email || !phone.trim()) {
      return { success: false, message: 'Complete all required fields.' };
    }
    const user: AuthUser = {
      id: `demo-${Date.now()}`,
      fullName: fullName.trim(),
      email,
      phone: phone.trim(),
      addresses: []
    };
    this.persistUser(user);
    this.tokenService.setToken(`demo-${Date.now()}`);
    this.currentUser.set(user);
    return { success: true, message: 'Your demo account is ready.' };
  }

  requestPasswordReset(email: string): string {
    if (!email.trim()) return 'Enter your email address to continue.';
    return 'If an account matches that email, reset instructions would be sent. This demo does not send email.';
  }

  updateProfile(updates: Partial<Pick<AuthUser, 'fullName' | 'phone'>>): void {
    const user = this.currentUser();
    if (!user) return;
    const next = { ...user, ...updates };
    this.persistUser(next);
    this.currentUser.set(next);
  }

  addAddress(address: Omit<SavedAddress, 'id'>): void {
    const user = this.currentUser();
    if (!user) return;
    const next = { ...user, addresses: [...user.addresses, { ...address, id: `address-${Date.now()}` }] };
    this.persistUser(next);
    this.currentUser.set(next);
  }

  removeAddress(addressId: string): void {
    const user = this.currentUser();
    if (!user) return;
    const next = { ...user, addresses: user.addresses.filter((address) => address.id !== addressId) };
    this.persistUser(next);
    this.currentUser.set(next);
  }

  logout(): void {
    this.tokenService.clearToken();
    this.currentUser.set(null);
  }

  private nameFromEmail(email: string): string {
    const name = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
    return name.replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Shopper';
  }

  private readUser(): AuthUser | null {
    if (typeof localStorage === 'undefined') return null;
    try {
      const value: unknown = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) ?? 'null');
      if (typeof value !== 'object' || value === null || !('email' in value)) return null;
      return value as AuthUser;
    } catch {
      return null;
    }
  }

  private persistUser(user: AuthUser): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      return;
    }
  }
}
