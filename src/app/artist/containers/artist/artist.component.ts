import { Component } from '@angular/core';
import { Artist } from '../../models/artist';

@Component({
  selector: 'artist',
  templateUrl: 'artist.component.html',
  styleUrls: ['artist.component.scss'],
})
export class ArtistComponent {
  artist: Artist = {
    id: 1,
    name: 'Depeche Mode',
    biography: 'The best band ever',
    photoUrl:
      'https://www.antena1rio.com.br/wp-content/uploads/6b6abc6b506c5d8bd3bc1dd8c17a24e4.png',
  };
}
