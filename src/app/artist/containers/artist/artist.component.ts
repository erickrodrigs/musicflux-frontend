import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { Album } from '../../../album/models/album';
import { Track } from '../../../track/models/track';

@Component({
  selector: 'artist',
  templateUrl: 'artist.component.html',
  styleUrls: ['artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  artist: Artist = { id: 1, name: '', biography: '', photoUrl: '' };
  albums: Album[] = [];
  topTracks: Track[] = [];

  constructor(
    private readonly artistService: ArtistService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.artistService
      .getById(id)
      .pipe(
        switchMap((artist) =>
          forkJoin({
            artist: of(artist),
            albums: this.artistService.getAlbums(artist.id),
            topTracks: this.artistService.getTopTracks(artist.id),
          })
        )
      )
      .subscribe(({ artist, albums, topTracks }) => {
        this.artist = artist;
        this.albums = albums;
        this.topTracks = topTracks;
      });
  }

  goToAlbumPage(albumId: number) {
    this.router.navigate([`/albums/${albumId}`]);
  }
}
