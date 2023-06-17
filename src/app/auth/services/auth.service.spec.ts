import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

const createResponse = <T>(body: T): Observable<T> => of(body);

class MockHttpClient {
  post<T>(): Observable<T> {
    return createResponse({} as T);
  }
}

describe('AuthService', () => {
  let httpClient: HttpClient;
  let service: AuthService;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    });
    httpClient = testBed.inject(HttpClient);
    service = testBed.inject(AuthService);
  });

  describe('login()', () => {
    const authCredentials = {
      username: 'foo',
      password: 'bar',
    };

    it('should log user in', () => {
      const token = 'myToken';
      spyOn(httpClient, 'post').and.returnValue(createResponse({ token }));

      service
        .login(authCredentials.username, authCredentials.password)
        .subscribe((response) => {
          expect(response.token).toBe(token);
        });
    });

    it('should return a proper error when login fails by invalid credentials', () => {
      const error = 'Username or password invalid';
      spyOn(httpClient, 'post').and.returnValue(
        throwError(() => new HttpErrorResponse({ status: 401 }))
      );

      service
        .login(authCredentials.username, authCredentials.password)
        .subscribe((response) => {
          expect(response.error).toBe(error);
        });
    });

    it('should return a unexpected error when login fails by server error', () => {
      const error = 'Something unexpected happened. Try again later';
      spyOn(httpClient, 'post').and.returnValue(
        throwError(() => new HttpErrorResponse({ status: 500 }))
      );

      service
        .login(authCredentials.username, authCredentials.password)
        .subscribe((response) => {
          expect(response.error).toBe(error);
        });
    });
  });

  describe('register()', () => {
    const registerInfo = {
      name: 'Erick',
      username: 'erickrodrigs',
      email: 'erick@erick.com',
      password: 'carlos123',
    };

    it('should register a new user', () => {
      const token = 'myToken';
      spyOn(httpClient, 'post').and.returnValue(createResponse({ token }));

      service
        .register(
          registerInfo.name,
          registerInfo.username,
          registerInfo.email,
          registerInfo.password
        )
        .subscribe((response) => {
          expect(response.token).toBe(token);
        });
    });

    it('should return a proper error when registration fails by server validation', () => {
      const errorMsg = 'This is a error that came from the server';
      spyOn(httpClient, 'post').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({ status: 401, error: { message: errorMsg } })
        )
      );

      service
        .register(
          registerInfo.name,
          registerInfo.username,
          registerInfo.email,
          registerInfo.password
        )
        .subscribe((response) => {
          expect(response.error).toBe(errorMsg);
        });
    });

    it('should return a proper error when registration fails by server validation', () => {
      const error = 'Something unexpected happened. Try again later';
      spyOn(httpClient, 'post').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
              error: {
                message: 'Something else that is not gonna be returned',
              },
            })
        )
      );

      service
        .register(
          registerInfo.name,
          registerInfo.username,
          registerInfo.email,
          registerInfo.password
        )
        .subscribe((response) => {
          expect(response.error).toBe(error);
        });
    });
  });
});
