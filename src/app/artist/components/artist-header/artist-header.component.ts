import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Artist } from '../../models/artist';

@Component({
  selector: 'artist-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-header.component.html',
  styleUrls: ['artist-header.component.scss'],
})
export class ArtistHeaderComponent {
  @Input()
  artist: Artist;

  @Output()
  backButtonClick = new EventEmitter<void>();
}
