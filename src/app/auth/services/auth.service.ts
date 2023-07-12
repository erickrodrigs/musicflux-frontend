import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {
  AuthResponseDetails,
  LoginPayload,
  RegisterPayload,
} from '../models/auth.model';
import { ApiError } from 'src/app/shared/models/api.model';

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  get isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token') || '';

    return token !== '' && !this.isTokenExpired(token);
  }

  login({
    username,
    password,
  }: LoginPayload): Observable<AuthResponseDetails | ApiError> {
    return this.httpClient
      .post<AuthResponseDetails>('http://localhost:3333/api/v1/auth', {
        username,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('auth_token', response.token);
          return response;
        })
      )
      .pipe(
        catchError(({ error }) =>
          this.handleError({
            ...error,
            message: 'Username or password invalid',
          })
        )
      );
  }

  register({
    name,
    username,
    email,
    password,
  }: RegisterPayload): Observable<AuthResponseDetails | ApiError> {
    return this.httpClient
      .post<AuthResponseDetails>('http://localhost:3333/api/v1/auth/register', {
        name,
        username,
        email,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('auth_token', response.token);
          return response;
        })
      )
      .pipe(catchError(({ error }) => this.handleError(error)));
  }

  private isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  private handleError(error: ApiError) {
    if (error.status >= 400 && error.status < 500) {
      return of(error);
    }

    return of({
      ...error,
      message: 'Something unexpected happened. Try again later',
    });
  }
}
