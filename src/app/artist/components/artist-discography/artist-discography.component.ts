import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Album } from '../../../album/models/album';

@Component({
  selector: 'artist-discography',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-discography.component.html',
  styleUrls: ['artist-discography.component.scss'],
})
export class ArtistDiscographyComponent {
  @Input()
  albums: Album[] = [];

  @Output()
  albumClick = new EventEmitter<number>();

  get items() {
    return this.albums
      .reverse()
      .map(({ id, title, releaseDate, coverUrl }) => ({
        id,
        name: title,
        description: new Date(Date.parse(releaseDate)).getFullYear().toString(),
        coverUrl,
      }));
  }
}
