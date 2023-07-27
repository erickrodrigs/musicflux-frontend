import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentlyPlayed } from '../models/recently-played';
import { Page } from '../../shared/models/api.model';

@Injectable()
export class RecentlyPlayedService {
  constructor(private readonly http: HttpClient) {}

  getRecentlyPlayedTracks(
    page = 0,
    size = 10
  ): Observable<Page<RecentlyPlayed>> {
    const authToken = localStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<Page<RecentlyPlayed>>(
      `http://localhost:3333/api/v1/me/recently-played?page=${page}&size=${size}`,
      { headers }
    );
  }
}
