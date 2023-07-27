import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { RecentlyPlayedModule } from './recently-played/recently-played.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => HomeModule },
  { path: 'search', pathMatch: 'full', loadChildren: () => SearchModule },
  { path: 'artists', pathMatch: 'prefix', loadChildren: () => ArtistModule },
  { path: 'albums', pathMatch: 'prefix', loadChildren: () => AlbumModule },
  {
    path: 'history',
    pathMatch: 'full',
    loadChildren: () => RecentlyPlayedModule,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    MatSidenavModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
