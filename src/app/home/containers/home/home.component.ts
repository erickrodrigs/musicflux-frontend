import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecentlyPlayedService } from '../../../recently-played/services/recently-played.service';
import { MusicfluxItem } from '../../../shared/models/musicflux-item';

@Component({
  selector: 'home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  items: MusicfluxItem[] = [];

  constructor(
    private readonly recentlyPlayedService: RecentlyPlayedService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.recentlyPlayedService
      .getRecentlyPlayedTracks()
      .subscribe(({ content }) => {
        const idToAlbum: {
          [key: number]: {
            id: number;
            title: string;
            coverUrl: string;
            artists: string[];
          };
        } = {};
        content.forEach(({ album, artists }) => {
          if (!(album.id in idToAlbum)) {
            idToAlbum[album.id] = {
              ...album,
              artists: artists.map(({ name }) => name),
            };
          }
        });

        this.items = Object.values(idToAlbum).map((album) => ({
          id: album.id,
          name: album.title,
          description: album.artists.join(', '),
          coverUrl: album.coverUrl,
        }));
      });
  }

  goToAlbumPage(albumId: number) {
    this.router.navigate([`/albums/${albumId}`]);
  }
}
