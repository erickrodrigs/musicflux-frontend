import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrackComponent } from './components/track/track.component';
import { TrackService } from './services/track.service';

@NgModule({
  declarations: [TrackComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [TrackService],
  exports: [TrackComponent],
})
export class TrackModule {}
