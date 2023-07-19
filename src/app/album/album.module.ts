import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AlbumComponent } from './containers/album/album.component';
import { AlbumHeaderComponent } from './components/album-header/album-header.component';

const routes: Routes = [
  { path: ':id', canActivate: [AuthGuard], component: AlbumComponent },
];

@NgModule({
  declarations: [AlbumComponent, AlbumHeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthModule.forRoot(),
    MatButtonModule,
    MatIconModule,
  ],
})
export class AlbumModule {}
