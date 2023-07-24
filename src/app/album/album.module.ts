import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TrackModule } from '../track/track.module';
import { AlbumService } from './services/album.service';
import { AlbumComponent } from './containers/album/album.component';
import { AlbumHeaderComponent } from './components/album-header/album-header.component';
import { AlbumTracksComponent } from './components/album-tracks/album-tracks.component';

const routes: Routes = [
  { path: ':id', canActivate: [AuthGuard], component: AlbumComponent },
];

@NgModule({
  declarations: [AlbumComponent, AlbumHeaderComponent, AlbumTracksComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    AuthModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    TrackModule.forRoot(),
  ],
  providers: [AlbumService],
})
export class AlbumModule {}
