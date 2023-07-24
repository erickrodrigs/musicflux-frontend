import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Track } from '../models/track';

@Injectable()
export class TrackService {
  constructor(private readonly http: HttpClient) {}

  getTracks(tracks: Track[]): Observable<{ [key: number]: string }> {
    return of(
      tracks.reduce(
        (acc, track) => ({
          ...acc,
          [track.id]: `http://localhost:3333/api/v1/files/${track.id}.mp3`,
        }),
        {}
      )
    );
  }
}
