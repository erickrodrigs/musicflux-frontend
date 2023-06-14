import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../auth/services/auth.service';

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

  get isNotLoading() {
    return !this.loading;
  }

  onPasswordIconTouch() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;
    this.loading = true;
    this.authService
      .login(username as string, password as string)
      .subscribe((response) => {
        this.loading = false;
        if (response.error) {
          this.openSnackBar(response.error);
          return;
        }

        this.goToHome();
      });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  private goToHome() {
    console.log('going to home...');
  }
}
