import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [TrackComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [TrackComponent],
})
export class TrackModule {}
