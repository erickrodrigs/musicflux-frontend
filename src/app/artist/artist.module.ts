import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TrackModule } from '../track/track.module';
import { ArtistComponent } from './containers/artist/artist.component';
import { ArtistHeaderComponent } from './components/artist-header/artist-header.component';
import { ArtistTopSongsComponent } from './components/artist-top-songs/artist-top-songs.component';
import { ArtistDiscographyComponent } from './components/artist-discography/artist-discography.component';
import { HorizontalListComponent } from '../shared/components/horizontal-list/horizontal-list.component';
import { ArtistBiographyComponent } from './components/artist-biography/artist-biography.component';

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
    RouterModule.forChild(routes),
    AuthModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    TrackModule,
    HorizontalListComponent,
  ],
})
export class ArtistModule {}
