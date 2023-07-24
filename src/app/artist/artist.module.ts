import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TrackModule } from '../track/track.module';
import { SharedModule } from '../shared/shared.module';
import { ArtistComponent } from './containers/artist/artist.component';
import { ArtistHeaderComponent } from './components/artist-header/artist-header.component';
import { ArtistTopTracksComponent } from './components/artist-top-tracks/artist-top-tracks.component';
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
    ArtistTopTracksComponent,
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
    MatSnackBarModule,
    TrackModule,
    SharedModule,
  ],
  providers: [ArtistService],
})
export class ArtistModule {}
