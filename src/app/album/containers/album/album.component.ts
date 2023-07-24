import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, of, switchMap } from 'rxjs';
import { AlbumService } from '../../services/album.service';
import { TrackService } from '../../../track/services/track.service';
import { Album } from '../../models/album';
import { Track } from '../../../track/models/track';

@Component({
  selector: 'album',
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: Album = {
    id: 1,
    title: '',
    coverUrl: '',
    releaseDate: '1970-01-01',
    artists: [],
  };
  tracks: Track[] = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly snackBar: MatSnackBar
  ) {}

  get albumLength() {
    return this.tracks.reduce((sum, track) => sum + track.length, 0);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.albumService
      .getAlbum(id)
      .pipe(
        switchMap((album) =>
          forkJoin({
            album: of(album),
            tracks: this.albumService.getTracks(album.id),
          })
        )
      )
      .subscribe(({ album, tracks }) => {
        this.album = album;
        this.tracks = tracks;
      });
  }

  playTrack(trackIndex: number) {
    const { id, title } = this.tracks[trackIndex];
    this.trackService.play(id).subscribe(() => {
      this.snackBar.open(`${title} has been played.`, 'OK', { duration: 3000 });
    });
  }

  backToPreviousPage() {
    this.location.back();
  }
}
