import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';
import { Album } from '../../album/models/album';
import { Track } from '../../track/models/track';

@Injectable()
export class ArtistService {
  constructor(private readonly httpClient: HttpClient) {}

  getById(id: number): Observable<Artist> {
    return this.httpClient.get<Artist>(
      `http://localhost:3333/api/v1/artists/${id}`
    );
  }

  getAlbums(id: number): Observable<Album[]> {
    return this.httpClient.get<Album[]>(
      `http://localhost:3333/api/v1/artists/${id}/albums`
    );
  }

  getTopTracks(id: number): Observable<Track[]> {
    return this.httpClient.get<Track[]>(
      `http://localhost:3333/api/v1/artists/${id}/top-tracks`
    );
  }
}
