import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlbumRoutingModule } from './album.routing.module';
import { TrackModule } from '../track/track.module';
import { AlbumService } from './services/album.service';
import { AlbumComponent } from './containers/album/album.component';
import { AlbumHeaderComponent } from './components/album-header/album-header.component';
import { AlbumTracksComponent } from './components/album-tracks/album-tracks.component';

@NgModule({
  declarations: [AlbumComponent, AlbumHeaderComponent, AlbumTracksComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AlbumRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    TrackModule,
  ],
  providers: [AlbumService],
})
export class AlbumModule {}
