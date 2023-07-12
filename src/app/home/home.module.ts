import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from './containers/home/home.component';
import { HorizontalListComponent } from '../shared/components/horizontal-list/horizontal-list.component';

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
    HorizontalListComponent,
  ],
})
export class HomeModule {}
