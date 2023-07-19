import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  get items() {
    return this.albums.reverse().map(({ title, releaseDate, coverUrl }) => ({
      name: title,
      description: new Date(Date.parse(releaseDate)).getFullYear(),
      coverUrl,
    }));
  }
}
