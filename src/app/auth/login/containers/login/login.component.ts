import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../auth/services/auth.service';
import { LoginPayload } from 'src/app/auth/models/auth.model';
import { ApiError } from 'src/app/shared/models/api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  hidePassword = true;

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  get passwordInputType() {
    return this.hidePassword ? 'password' : 'text';
  }

  get passwordIconName() {
    return this.hidePassword ? 'visibility_off' : 'visibility';
  }

  get isUsernameInvalid() {
    const control = this.form.get('username');
    return control?.hasError('required') && control.touched;
  }

  get isPasswordInvalid() {
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get usernameError() {
    return 'Username is required';
  }

  get passwordError() {
    return 'Password is required';
  }

  get isNotLoading() {
    return !this.loading;
  }

  onPasswordIconTouch() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.authService
      .login(this.form.value as LoginPayload)
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
    console.log('going to home...');
  }
}
