import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RecentlyPlayedService } from '../../services/recently-played.service';

interface TableElement {
  track: string;
  album: string;
  artist: string;
  playedAt: string;
}

@Component({
  selector: 'recently-played',
  templateUrl: 'recently-played.component.html',
  styleUrls: ['recently-played.component.scss'],
})
export class RecentlyPlayedComponent implements OnInit {
  displayedColumns = ['track', 'album', 'artist', 'playedAt'];
  currentPage = 0;
  numberOfPages = 0;
  dataSource = new MatTableDataSource<TableElement>([]);

  constructor(private readonly recentlyPlayedService: RecentlyPlayedService) {}

  get isFirstPage() {
    return this.currentPage === 0;
  }

  get isLastPage() {
    return this.currentPage === this.numberOfPages - 1;
  }

  ngOnInit() {
    this.onPageChange();
  }

  goToNextPage() {
    this.currentPage += 1;
    this.onPageChange(this.currentPage);
  }

  goToPreviousPage() {
    this.currentPage -= 1;
    this.onPageChange(this.currentPage);
  }

  onPageChange(page = 0) {
    this.recentlyPlayedService
      .getRecentlyPlayedTracks(page)
      .subscribe(({ content, totalPages }) => {
        this.numberOfPages = totalPages;
        this.dataSource.data = content.map(
          ({ track, album, artists, createdAt }) => ({
            track: track.title,
            album: album.title,
            artist: artists.map(({ name }) => name).join(', '),
            playedAt: createdAt,
          })
        );
      });
  }
}
