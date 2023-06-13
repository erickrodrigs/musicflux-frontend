import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, of } from 'rxjs';

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
        catchError(({ status }) => {
          if (status >= 400 && status < 500) {
            return of({ error: 'Username or password invalid' });
          }

          return throwError(
            () => new Error('Something bad happened. Try again later')
          );
        })
      );
  }
}
