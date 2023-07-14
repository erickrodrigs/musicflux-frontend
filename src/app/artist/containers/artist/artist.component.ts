import { Component } from '@angular/core';

@Component({
  selector: 'artist',
  templateUrl: 'artist.component.html',
  styleUrls: ['artist.component.scss'],
})
export class ArtistComponent {
  artist = {
    name: 'Depeche Mode',
    coverUrl:
      'https://www.antena1rio.com.br/wp-content/uploads/6b6abc6b506c5d8bd3bc1dd8c17a24e4.png',
  };
}
