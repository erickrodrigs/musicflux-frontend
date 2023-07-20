import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SearchResult } from '../../models/search';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    search: new FormControl(''),
  });
  result: SearchResult = {
    artists: [],
    albums: [],
    tracks: [],
    playlists: [],
  };
  filterOptions = [
    { name: 'Artist', selected: false },
    { name: 'Album', selected: false },
    { name: 'Track', selected: false },
    { name: 'Playlist', selected: false },
  ];

  obs: Subscription;

  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  get isMobile() {
    return window.innerWidth < 768;
  }

  get artists() {
    return this.result.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      coverUrl:
        artist.photoUrl ===
        'https://freemusicarchive.org/img/default/artist.jpg'
          ? ''
          : artist.photoUrl,
    }));
  }

  get albums() {
    return this.result.albums.map((album) => ({
      id: album.id,
      name: album.title,
      description: album.artists.map(({ name }) => name).join(', '),
      coverUrl: album.coverUrl,
    }));
  }

  get tracks() {
    return this.result.tracks.map((track) => ({
      id: track.id,
      name: track.title,
      description: track.artists.map(({ name }) => name).join(', '),
      coverUrl: track.album.coverUrl,
    }));
  }

  get playlists() {
    return Array.from({ length: 2 }).map((_, index) => ({
      id: index + 1,
      name: 'Playlist name',
    }));
  }

  get showResults() {
    return Object.keys(this.result).some((key) => this.result[key].length > 0);
  }

  get showAll() {
    return this.filterOptions.every(({ selected }) => !selected);
  }

  get showArtists() {
    return (
      this.result.artists.length > 0 &&
      (this.showAll ||
        this.filterOptions.find((option) => option.name === 'Artist')?.selected)
    );
  }

  get showAlbums() {
    return (
      this.result.albums.length > 0 &&
      (this.showAll ||
        this.filterOptions.find((option) => option.name === 'Album')?.selected)
    );
  }

  get showTracks() {
    return (
      this.result.tracks.length > 0 &&
      (this.showAll ||
        this.filterOptions.find((option) => option.name === 'Track')?.selected)
    );
  }

  get showPlaylists() {
    return (
      this.result.playlists.length > 0 &&
      (this.showAll ||
        this.filterOptions.find((option) => option.name === 'Playlist')
          ?.selected)
    );
  }

  ngOnInit() {
    this.obs = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(({ search }) => this.onSearch(search || ''));
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

  onFilterOptionSelectionChange(option: { name: string; selected: boolean }) {
    option.selected = !option.selected;
  }

  onSearch(search: string) {
    if (search === '') {
      this.clearResults();
      return;
    }

    const types = this.showAll
      ? this.filterOptions.map(({ name }) => name)
      : this.filterOptions
          .filter(({ selected }) => selected)
          .map(({ name }) => name);

    types.forEach((type) => {
      this.searchService
        .search(search, type as 'Artist' | 'Album' | 'Track' | 'Playlist')
        .subscribe((result) => {
          const key = type.toLocaleLowerCase() + 's';
          this.result[key] = result[key];
        });
    });
  }

  onBackButtonToggle() {
    this.location.back();
  }

  clearResults() {
    this.result = {
      artists: [],
      albums: [],
      tracks: [],
      playlists: [],
    };
  }

  goToArtistPage(artistId: number) {
    this.router.navigate([`/artists/${artistId}`]);
  }

  goToAlbumPage(albumId: number) {
    this.router.navigate([`/albums/${albumId}`]);
  }
}
