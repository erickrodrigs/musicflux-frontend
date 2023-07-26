import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { RecentlyPlayedModule } from '../recently-played/recently-played.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeComponent } from './containers/home/home.component';

const ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    AuthModule.forRoot(),
    RecentlyPlayedModule,
    SharedModule,
  ],
})
export class HomeModule {}
