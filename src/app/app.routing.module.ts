import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { HomeModule } from './home/home.module';
import { RecentlyPlayedModule } from './recently-played/recently-played.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => HomeModule,
  },
  {
    path: 'search',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => SearchModule,
  },
  {
    path: 'artists',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () => ArtistModule,
  },
  {
    path: 'albums',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () => AlbumModule,
  },
  {
    path: 'history',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => RecentlyPlayedModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
