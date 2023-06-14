import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage = '';

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  get isUsernameInvalid() {
    const control = this.form.get('username');
    return control?.hasError('required') && control.touched;
  }

  get isPasswordInvalid() {
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get hasError() {
    return this.errorMessage.length > 0;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;
    this.authService
      .login(username as string, password as string)
      .subscribe((response) => {
        if (response.error) {
          this.errorMessage = response.error;
          return;
        }

        this.goToHome();
      });
  }

  private goToHome() {
    console.log('going to home...');
  }
}
