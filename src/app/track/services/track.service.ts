import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TrackService {
  constructor(private readonly http: HttpClient) {}

  play(trackId: number): Observable<File> {
    const authToken = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<File>(
      `http://localhost:3333/api/v1/me/tracks/${trackId}/play`,
      { headers, responseType: 'arraybuffer' as 'json' }
    );
  }
}
