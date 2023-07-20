import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/search';

type SearchType = 'Artist' | 'Album' | 'Track' | 'Playlist';

@Injectable()
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  search(query: string, type: SearchType): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `http://localhost:3333/api/v1/search?q=${query}&type=${type}`
    );
  }
}
