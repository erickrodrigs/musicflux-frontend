import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly authService: AuthService) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get isMobile() {
    return window.innerWidth < 768;
  }
}
