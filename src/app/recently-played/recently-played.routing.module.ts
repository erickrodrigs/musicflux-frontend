import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentlyPlayedComponent } from './containers/recently-played/recently-played.component';

const routes: Routes = [{ path: '', component: RecentlyPlayedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentlyPlayedRoutingModule {}
