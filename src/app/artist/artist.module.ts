import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ArtistComponent } from './containers/artist/artist.component';

const routes: Routes = [
  { path: ':id', canActivate: [AuthGuard], component: ArtistComponent },
];

@NgModule({
  declarations: [ArtistComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AuthModule.forRoot()],
})
export class ArtistModule {}
