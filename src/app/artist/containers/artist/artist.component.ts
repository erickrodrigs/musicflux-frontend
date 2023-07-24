import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, of, switchMap } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { TrackService } from '../../../track/services/track.service';
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
    private readonly trackService: TrackService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly snackBar: MatSnackBar
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

  playTrack(trackIndex: number) {
    const { id, title } = this.topTracks[trackIndex];
    this.trackService.play(id).subscribe(() => {
      this.snackBar.open(`${title} has been played.`, 'OK', { duration: 3000 });
    });
  }

  backToPreviousPage() {
    this.location.back();
  }

  goToAlbumPage(albumId: number) {
    this.router.navigate([`/albums/${albumId}`]);
  }
}
