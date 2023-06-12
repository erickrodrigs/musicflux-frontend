import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => LoginModule },
  { path: 'register', loadChildren: () => RegisterModule },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    LoginModule,
    RegisterModule,
  ],
})
export class AuthModule {}
