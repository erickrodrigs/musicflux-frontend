import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ArtistComponent } from './containers/artist/artist.component';
import { ArtistHeaderComponent } from './components/artist-header/artist-header.component';

const routes: Routes = [
  { path: ':id', canActivate: [AuthGuard], component: ArtistComponent },
];

@NgModule({
  declarations: [ArtistComponent, ArtistHeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthModule.forRoot(),
    MatButtonModule,
    MatIconModule,
  ],
})
export class ArtistModule {}
