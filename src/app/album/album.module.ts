import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AlbumComponent } from './containers/album/album.component';

const routes: Routes = [
  { path: ':id', canActivate: [AuthGuard], component: AlbumComponent },
];

@NgModule({
  declarations: [AlbumComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AuthModule.forRoot()],
})
export class AlbumModule {}
