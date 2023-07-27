import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeComponent } from './containers/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule.forRoot()],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
