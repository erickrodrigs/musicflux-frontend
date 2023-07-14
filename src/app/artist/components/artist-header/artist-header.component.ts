import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'artist-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-header.component.html',
  styleUrls: ['artist-header.component.scss'],
})
export class ArtistHeaderComponent {
  @Input()
  artist: any;
}
