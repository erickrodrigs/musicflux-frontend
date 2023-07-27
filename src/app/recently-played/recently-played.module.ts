import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecentlyPlayedRoutingModule } from './recently-played.routing.module';
import { RecentlyPlayedService } from './services/recently-played.service';
import { RecentlyPlayedComponent } from './containers/recently-played/recently-played.component';

@NgModule({
  declarations: [RecentlyPlayedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RecentlyPlayedRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [RecentlyPlayedService],
})
export class RecentlyPlayedModule {}
