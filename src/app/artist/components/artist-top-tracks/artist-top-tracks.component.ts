import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Track } from '../../../track/models/track';

@Component({
  selector: 'artist-top-tracks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-top-tracks.component.html',
  styleUrls: ['artist-top-tracks.component.scss'],
})
export class ArtistTopTracksComponent {
  @Input()
  tracks: Track[];

  @Output()
  trackClick = new EventEmitter<number>();
}
