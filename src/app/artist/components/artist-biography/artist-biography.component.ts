import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'artist-biography',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'artist-biography.component.html',
  styleUrls: ['artist-biography.component.scss'],
})
export class ArtistBiographyComponent {
  @Input()
  biography: string;
}
