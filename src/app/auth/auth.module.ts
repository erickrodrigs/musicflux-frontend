import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: () => LoginModule },
      { path: 'register', loadChildren: () => RegisterModule },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(ROUTES)],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}
