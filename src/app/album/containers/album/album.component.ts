import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { Track } from '../../../track/models/track';
import { Store } from '../../../store';

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
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly location: Location
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
    this.store.set('queue', this.tracks);
    this.store.set('currentTrack', {
      index: trackIndex,
      file: `http://localhost:3333/api/v1/files/${this.tracks[trackIndex].id}.mp3`,
    });
  }

  backToPreviousPage() {
    this.location.back();
  }
}
