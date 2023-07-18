import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Track } from '../../../track/models/track';

@Component({
  selector: 'artist-top-songs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-top-songs.component.html',
  styleUrls: ['artist-top-songs.component.scss'],
})
export class ArtistTopSongsComponent {
  @Input()
  tracks: Track[];
}
