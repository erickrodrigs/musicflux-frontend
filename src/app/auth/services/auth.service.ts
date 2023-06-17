import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface AuthRequestDetails {
  token?: string;
  error?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(username: string, password: string): Observable<AuthRequestDetails> {
    return this.httpClient
      .post<AuthRequestDetails>('http://localhost:3333/api/v1/auth', {
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

  register(
    name: string,
    username: string,
    email: string,
    password: string
  ): Observable<AuthRequestDetails> {
    return this.httpClient
      .post<AuthRequestDetails>('http://localhost:3333/api/v1/auth/register', {
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
