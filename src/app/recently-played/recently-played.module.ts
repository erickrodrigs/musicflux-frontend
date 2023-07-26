import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RecentlyPlayedService } from './services/recently-played.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [RecentlyPlayedService],
})
export class RecentlyPlayedModule {}
