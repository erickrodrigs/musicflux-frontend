import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.authToken.pipe(
      map((token) => {
        if (!token || this.isTokenExpired(token)) {
          this.router.navigate(['/auth/login']);
        }
        return !!token;
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
