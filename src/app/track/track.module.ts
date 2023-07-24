import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { TrackComponent } from './components/track/track.component';
import { PlayerComponent } from './container/player/player.component';
import { AudioService } from './services/audio.service';
import { TrackService } from './services/track.service';

@NgModule({
  declarations: [TrackComponent, PlayerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSliderModule,
  ],
  exports: [TrackComponent, PlayerComponent],
})
export class TrackModule {
  static forRoot(): ModuleWithProviders<TrackModule> {
    return {
      ngModule: TrackModule,
      providers: [AudioService, TrackService],
    };
  }
}
