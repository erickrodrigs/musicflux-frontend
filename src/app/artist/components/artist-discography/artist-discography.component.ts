import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Album } from '../../../album/models/album';
import { MusicfluxItem } from '../../../shared/models/musicflux-item';

@Component({
  selector: 'artist-discography',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-discography.component.html',
  styleUrls: ['artist-discography.component.scss'],
})
export class ArtistDiscographyComponent {
  @Input()
  set albums(albums: Album[]) {
    this.items = albums
      .reverse()
      .map(({ id, title, releaseDate, coverUrl }) => ({
        id,
        name: title,
        description: new Date(Date.parse(releaseDate)).getFullYear().toString(),
        coverUrl,
      }));
  }

  @Output()
  albumClick = new EventEmitter<number>();

  items: MusicfluxItem[] = [];
}
