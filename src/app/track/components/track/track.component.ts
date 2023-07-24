import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Track } from '../../models/track';

@Component({
  selector: 'musicflux-track',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'track.component.html',
  styleUrls: ['track.component.scss'],
})
export class TrackComponent {
  @Input()
  track: Track;

  @Input()
  trackNumber: number;

  @Input()
  showArtistName = false;

  @Input()
  showAlbumCover = true;

  @Input()
  showNumberOfPlays = true;

  @Output()
  trackClick = new EventEmitter<number>();

  showPlayButton = false;

  get isMobile() {
    return window.innerWidth < 768;
  }

  get artistsNames() {
    return this.track.artists.map((artist) => artist.name).join(', ');
  }

  get numberOfPlays() {
    return this.track.numberOfPlays
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  get trackLength() {
    const minutes = Math.floor(this.track.length / 60);
    const seconds = this.track.length - minutes * 60;

    if (seconds <= 9) {
      return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  get favoriteIconName() {
    return this.track.liked ? 'favorite' : 'favorite_border';
  }
}
