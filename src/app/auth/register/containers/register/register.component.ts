import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterPayload } from 'src/app/auth/models/auth.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiError } from 'src/app/shared/models/api.model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  hidePassword = true;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  get passwordInputType() {
    return this.hidePassword ? 'password' : 'text';
  }

  get passwordIconName() {
    return this.hidePassword ? 'visibility_off' : 'visibility';
  }

  get isNameInvalid() {
    return this.checkIfFieldIsInvalid('name', 'required');
  }

  get isUsernameInvalid() {
    return this.checkIfFieldIsInvalid('username', 'required');
  }

  get isEmailInvalid() {
    return (
      this.checkIfFieldIsInvalid('email', 'required') ||
      this.checkIfFieldIsInvalid('email', 'email')
    );
  }

  get isPasswordInvalid() {
    return this.checkIfFieldIsInvalid('password', 'required');
  }

  get isPasswordConfirmationInvalid() {
    return this.checkIfFieldIsInvalid('passwordConfirmation', 'required');
  }

  get nameError() {
    return 'Name is required';
  }

  get usernameError() {
    return 'Username is required';
  }

  get emailError() {
    return 'Email format is not valid';
  }

  get passwordError() {
    return 'Password is required';
  }

  get passwordConfirmationError() {
    return 'Password confirmation is required';
  }

  get isNotLoading() {
    return !this.loading;
  }

  onPasswordIconTouch() {
    this.hidePassword = !this.hidePassword;
  }

  checkIfFieldIsInvalid(fieldName: string, validation: string) {
    const control = this.form.get(fieldName);
    return control?.hasError(validation) && control.touched;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { name, username, email, password, passwordConfirmation } =
      this.form.value;

    if (password !== passwordConfirmation) {
      this.openSnackBar('Password and its confirmation must be equal');
      return;
    }

    this.loading = true;
    this.authService
      .register({ name, username, email, password } as RegisterPayload)
      .subscribe((response) => {
        this.loading = false;
        if ((response as ApiError).message) {
          this.openSnackBar((response as ApiError).message);
          return;
        }

        this.goToHome();
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
