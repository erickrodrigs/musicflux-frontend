import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated;

    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
    }

    return isAuthenticated;
  }
}
