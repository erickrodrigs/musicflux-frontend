import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  AuthResponseDetails,
  LoginPayload,
} from 'src/app/auth/models/auth.model';

class MockAuthService {
  login({ username, password }: LoginPayload): Observable<AuthResponseDetails> {
    return of({ token: username + password });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        MatSnackBar,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = el.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should show username input error when username is invalid', () => {
      const usernameInput = el.query(By.css("input[name='username']"))
        .nativeElement as HTMLInputElement;
      usernameInput.value = '';
      usernameInput.dispatchEvent(new Event('input'));
      usernameInput.dispatchEvent(new Event('blur'));

      fixture.detectChanges();

      expect(component.form.invalid).toBeTrue();
      expect(component.isUsernameInvalid).toBeTrue();
      expect(el.query(By.css('mat-error')).nativeElement.textContent).toBe(
        component.usernameError
      );
    });

    it('should show password input error when password is invalid', () => {
      const passwordInput = el.query(By.css("input[name='password']"))
        .nativeElement as HTMLInputElement;
      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('blur'));

      fixture.detectChanges();

      expect(component.form.invalid).toBeTrue();
      expect(component.isPasswordInvalid).toBeTrue();
      expect(el.query(By.css('mat-error')).nativeElement.textContent).toBe(
        component.passwordError
      );
    });
  });

  describe('onPasswordIconTouch()', () => {
    beforeEach(() => {
      const event = new Event('ClickEvent');

      el.query(By.directive(MatIconButton)).triggerEventHandler('click', event);
      fixture.detectChanges();
    });

    it('should set hidePassword state to true', () => {
      expect(component.hidePassword).toBeFalse();
    });

    it('should change password input type to text', () => {
      expect(component.passwordInputType).toBe('text');
    });

    it('should change password input icon to visibility', () => {
      expect(component.passwordIconName).toBe('visibility');
    });
  });

  describe('onSubmit()', () => {
    it('should not call auth service when form data are invalid', () => {
      const testData = [
        { username: '', password: '' },
        { username: 'foo', password: '' },
        { username: '', password: 'bar' },
      ];
      spyOn(service, 'login').and.callThrough();

      testData.forEach((formData) => {
        component.form.setValue(formData);
        component.onSubmit();
      });

      expect(service.login).not.toHaveBeenCalled();
    });

    it('should call auth service passing email and password', () => {
      const formData = { username: 'foo', password: 'bar' };
      spyOn(service, 'login').and.callThrough();
      component.form.setValue(formData);

      component.onSubmit();

      expect(service.login).toHaveBeenCalledOnceWith(formData);
    });

    it('should open snack bar when auth service returns an error property', () => {
      const error = 'this is a error message';
      spyOn(service, 'login').and.returnValue(of({ error }));
      spyOn(component, 'openSnackBar').and.callThrough();
      component.form.setValue({ username: 'foo', password: 'bar' });

      component.onSubmit();

      expect(component.openSnackBar).toHaveBeenCalledOnceWith(error);
    });

    it('should go to home when auth service does not return an error property', () => {
      spyOn(component, 'goToHome').and.callThrough();
      component.form.setValue({ username: 'foo', password: 'bar' });

      component.onSubmit();

      expect(component.goToHome).toHaveBeenCalled();
    });
  });
});
