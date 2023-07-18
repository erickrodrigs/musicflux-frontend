import { Component } from '@angular/core';
import { Artist } from '../../models/artist';
import { Track } from '../../../track/models/track';
import { Album } from '../../../album/models/album';

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

  albums: Album[] = [
    {
      id: 1,
      title: 'Music For The Masses',
      coverUrl:
        'https://i.scdn.co/image/ab67616d0000b2738636ea09d374ec9937e81388',
      releaseDate: new Date(),
      artists: [{ id: 1, name: 'Depeche Mode' }],
    },
  ];

  tracks: Track[] = [
    {
      id: 1,
      title: 'Never Let Me Down Again',
      length: 287,
      numberOfPlays: 6975832,
      liked: true,
      artists: [{ id: 1, name: 'Depeche Mode' }],
      album: {
        id: 1,
        title: 'Music For The Masses',
        coverUrl:
          'https://i.scdn.co/image/ab67616d0000b2738636ea09d374ec9937e81388',
      },
      genres: ['Synth-pop'],
    },
  ];
}
