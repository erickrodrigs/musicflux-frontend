import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  AuthResponseDetails,
  LoginPayload,
  RegisterPayload,
} from '../models/auth.model';
import { ApiError } from 'src/app/shared/models/api.model';

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

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
      .pipe(catchError(({ error }) => this.handleError(error)));
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
