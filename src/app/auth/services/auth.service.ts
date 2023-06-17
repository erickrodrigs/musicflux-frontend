import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  AuthResponseDetails,
  LoginPayload,
  RegisterPayload,
} from '../models/auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login({ username, password }: LoginPayload): Observable<AuthResponseDetails> {
    return this.httpClient
      .post<AuthResponseDetails>('http://localhost:3333/api/v1/auth', {
        username,
        password,
      })
      .pipe(
        catchError(({ status }) =>
          this.handleError({
            status,
            error: { message: 'Username or password invalid' },
          })
        )
      );
  }

  register({
    name,
    username,
    email,
    password,
  }: RegisterPayload): Observable<AuthResponseDetails> {
    return this.httpClient
      .post<AuthResponseDetails>('http://localhost:3333/api/v1/auth/register', {
        name,
        username,
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError({
    status,
    error,
  }: {
    status: number;
    error: { message: string };
  }) {
    if (status >= 400 && status < 500) {
      return of({ error: error.message });
    }

    return of({
      error: 'Something unexpected happened. Try again later',
    });
  }
}
