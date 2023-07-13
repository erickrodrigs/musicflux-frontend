import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
})
export class SearchComponent {
  search = '';

  filterOptions = [
    { name: 'Artist', selected: false },
    { name: 'Album', selected: false },
    { name: 'Track', selected: false },
    { name: 'Playlist', selected: false },
  ];
  artists = Array.from({ length: 2 }).map(() => ({
    coverUrl: '',
    name: 'Artist name',
  }));
  albums = Array.from({ length: 2 }).map(() => ({
    coverUrl: '',
    name: 'Album title',
    description: 'Artist name',
  }));
  tracks = Array.from({ length: 8 }).map(() => ({
    coverUrl: '',
    name: 'Track title',
    description: 'Artist name',
  }));
  playlists = Array.from({ length: 2 }).map(() => ({
    coverUrl: '',
    name: 'Playlist name',
  }));

  constructor(private readonly location: Location) {}

  get isMobile() {
    return window.innerWidth < 768;
  }

  get showAll() {
    return this.filterOptions.every(({ selected }) => !selected);
  }

  get showArtists() {
    return (
      this.showAll ||
      this.filterOptions.find((option) => option.name === 'Artist')?.selected
    );
  }

  get showAlbums() {
    return (
      this.showAll ||
      this.filterOptions.find((option) => option.name === 'Album')?.selected
    );
  }

  get showTracks() {
    return (
      this.showAll ||
      this.filterOptions.find((option) => option.name === 'Track')?.selected
    );
  }

  get showPlaylists() {
    return (
      this.showAll ||
      this.filterOptions.find((option) => option.name === 'Playlist')?.selected
    );
  }

  onFilterOptionSelectionChange(option: { name: string; selected: boolean }) {
    option.selected = !option.selected;
  }

  onSearch() {
    console.log(`searching for ${this.search}...`);
  }

  onBackButtonToggle() {
    this.location.back();
  }
}
