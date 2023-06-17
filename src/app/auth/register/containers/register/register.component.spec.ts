import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  AuthResponseDetails,
  RegisterPayload,
} from 'src/app/auth/models/auth.model';

class MockAuthService {
  register({
    name,
    username,
    email,
    password,
  }: RegisterPayload): Observable<AuthResponseDetails> {
    return of({ token: name + username + email + password });
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = el.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should show input error when field is invalid', () => {
      [
        {
          name: 'name',
          error: component.nameError,
        },
        {
          name: 'username',
          error: component.usernameError,
        },
        {
          name: 'email',
          error: component.emailError,
        },
        {
          name: 'password',
          error: component.passwordError,
        },
        {
          name: 'passwordConfirmation',
          error: component.passwordConfirmationError,
        },
      ].forEach(({ name, error }) => {
        const input = el.query(By.css(`input[name=${name}]`))
          .nativeElement as HTMLInputElement;
        input.dispatchEvent(new Event('focus'));
        input.dispatchEvent(new Event('blur'));

        fixture.detectChanges();

        expect(component.form.invalid).toBeTrue();
        expect(el.query(By.css('mat-error')).nativeElement.textContent).toBe(
          error
        );

        input.value = 'aa@aa.com';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
      });
    });
  });

  describe('onSubmit()', () => {
    it('should register a new user', () => {
      const formData = {
        name: 'erick',
        username: 'foo',
        email: 'email@email.com',
        password: 'bar',
        passwordConfirmation: 'bar',
      };
      const { name, username, email, password } = formData;
      spyOn(service, 'register').and.callThrough();
      spyOn(component, 'goToHome').and.callThrough();
      spyOn(component, 'openSnackBar').and.callThrough();
      component.form.setValue(formData);

      component.onSubmit();

      expect(service.register).toHaveBeenCalledOnceWith({
        name,
        username,
        email,
        password,
      });
      expect(component.goToHome).toHaveBeenCalled();
      expect(component.openSnackBar).not.toHaveBeenCalled();
    });

    it('should not call auth service register method when form is invalid', () => {
      const testData = [
        {
          name: '',
          username: 'foo',
          email: 'email@email.com',
          password: 'bar',
          passwordConfirmation: 'baz',
        },
        {
          name: 'erick',
          username: '',
          email: 'email@email.com',
          password: 'bar',
          passwordConfirmation: 'baz',
        },
        {
          name: 'erick',
          username: 'foo',
          email: 'email',
          password: 'bar',
          passwordConfirmation: 'baz',
        },
        {
          name: 'erick',
          username: 'foo',
          email: 'email@email.com',
          password: '',
          passwordConfirmation: 'baz',
        },
        {
          name: 'erick',
          username: 'foo',
          email: 'email@email.com',
          password: 'bar',
          passwordConfirmation: '',
        },
      ];
      spyOn(service, 'register').and.callThrough();

      testData.forEach((formData) => {
        component.form.setValue(formData);
        component.onSubmit();
      });

      expect(service.register).not.toHaveBeenCalled();
    });

    it('should show error when password and its confirmation do not match', () => {
      spyOn(service, 'register').and.callThrough();
      spyOn(component, 'openSnackBar').and.callThrough();
      component.form.setValue({
        name: 'erick',
        username: 'foo',
        email: 'email@email.com',
        password: 'bar',
        passwordConfirmation: 'baz',
      });

      component.onSubmit();

      expect(service.register).not.toHaveBeenCalled();
      expect(component.openSnackBar).toHaveBeenCalledOnceWith(
        'Password and its confirmation must be equal'
      );
    });

    it('should show error in snack bar when there is an error', () => {
      const error = 'Username already exists';
      spyOn(service, 'register').and.returnValue(of({ error }));
      spyOn(component, 'openSnackBar').and.callThrough();
      spyOn(component, 'goToHome').and.callThrough();
      component.form.setValue({
        name: 'erick',
        username: 'foo',
        email: 'email@email.com',
        password: 'bar',
        passwordConfirmation: 'bar',
      });

      component.onSubmit();

      expect(service.register).toHaveBeenCalled();
      expect(component.openSnackBar).toHaveBeenCalledOnceWith(error);
      expect(component.goToHome).not.toHaveBeenCalled();
    });
  });
});
