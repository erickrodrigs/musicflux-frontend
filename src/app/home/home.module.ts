import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecentlyPlayedModule } from '../recently-played/recently-played.module';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './containers/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, SharedModule, RecentlyPlayedModule],
})
export class HomeModule {}
