import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Track } from '../../../track/models/track';

@Component({
  selector: 'album-tracks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'album-tracks.component.html',
})
export class AlbumTracksComponent {
  @Input()
  tracks: Track[];
}
