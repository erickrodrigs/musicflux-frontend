import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Album } from '../../models/album';

@Component({
  selector: 'album-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'album-header.component.html',
  styleUrls: ['album-header.component.scss'],
})
export class AlbumHeaderComponent {
  @Input()
  album: Album;

  @Input()
  albumLength = 0;

  get artists() {
    return this.album.artists.map((artist) => artist.name).join(', ');
  }

  get releaseDate() {
    const releaseDate = new Date(Date.parse(this.album.releaseDate));
    const year = releaseDate.getFullYear();
    const day = releaseDate.getDate();
    const month = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }[releaseDate.getMonth()];

    return `${month} ${day}, ${year}`;
  }

  get lengthString() {
    if (this.albumLength >= 3600) {
      const hours = Math.floor(this.albumLength / 3600);
      const secondsRemaining = this.albumLength - hours * 3600;
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining - minutes * 60;

      return `${hours}h${minutes}min${seconds}s`;
    } else {
      const minutes = Math.floor(this.albumLength / 60);
      const seconds = this.albumLength - minutes * 60;

      return `${minutes}min${seconds}s`;
    }
  }
}
