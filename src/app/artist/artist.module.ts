import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TrackModule } from '../track/track.module';
import { SharedModule } from '../shared/shared.module';
import { ArtistComponent } from './containers/artist/artist.component';
import { ArtistHeaderComponent } from './components/artist-header/artist-header.component';
import { ArtistTopSongsComponent } from './components/artist-top-songs/artist-top-songs.component';
import { ArtistDiscographyComponent } from './components/artist-discography/artist-discography.component';
import { ArtistBiographyComponent } from './components/artist-biography/artist-biography.component';
import { ArtistService } from './services/artist.service';

const routes: Routes = [
  { path: ':id', canActivate: [AuthGuard], component: ArtistComponent },
];

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistHeaderComponent,
    ArtistTopSongsComponent,
    ArtistDiscographyComponent,
    ArtistBiographyComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    AuthModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    TrackModule,
    SharedModule,
  ],
  providers: [ArtistService],
})
export class ArtistModule {}
