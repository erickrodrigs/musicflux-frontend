import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Track } from '../../track/models/track';

@Injectable()
export class AlbumService {
  constructor(private readonly http: HttpClient) {}

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`http://localhost:3333/api/v1/albums/${id}`);
  }

  getTracks(id: number): Observable<Track[]> {
    return this.http.get<Track[]>(
      `http://localhost:3333/api/v1/albums/${id}/tracks`
    );
  }
}
