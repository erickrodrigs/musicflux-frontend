import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Track } from '../../../track/models/track';

@Component({
  selector: 'album-tracks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'album-tracks.component.html',
})
export class AlbumTracksComponent {
  @Input()
  tracks: Track[];

  @Output()
  trackClick = new EventEmitter<number>();
}
