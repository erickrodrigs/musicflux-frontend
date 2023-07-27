import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RecentlyPlayedComponent } from './containers/recently-played/recently-played.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RecentlyPlayedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule.forRoot()],
  exports: [RouterModule],
})
export class RecentlyPlayedRoutingModule {}
