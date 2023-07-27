import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ArtistRoutingModule } from './artist.routing.module';
import { TrackModule } from '../track/track.module';
import { SharedModule } from '../shared/shared.module';
import { ArtistComponent } from './containers/artist/artist.component';
import { ArtistHeaderComponent } from './components/artist-header/artist-header.component';
import { ArtistTopTracksComponent } from './components/artist-top-tracks/artist-top-tracks.component';
import { ArtistDiscographyComponent } from './components/artist-discography/artist-discography.component';
import { ArtistBiographyComponent } from './components/artist-biography/artist-biography.component';
import { ArtistService } from './services/artist.service';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistHeaderComponent,
    ArtistTopTracksComponent,
    ArtistDiscographyComponent,
    ArtistBiographyComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ArtistRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    TrackModule,
    SharedModule,
  ],
  providers: [ArtistService],
})
export class ArtistModule {}
