/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService } from '../../services/audio.service';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
import { StreamState } from '../../models/stream-state';
import { Store } from '../../../store';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  state: StreamState;
  tracks: Track[];
  currentTrackSubscription: Subscription;
  tracksSubscription: Subscription;
  currentTrack = { index: -1, file: '' };
  trackIdToUrl: { [key: number]: string } = {};

  constructor(
    private readonly audioService: AudioService,
    private readonly trackService: TrackService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.tracksSubscription = this.store
      .select<Track[]>('queue')
      .subscribe((queue) => {
        this.tracks = queue;

        this.trackService.getTracks(this.tracks).subscribe((trackIdToUrl) => {
          this.trackIdToUrl = trackIdToUrl;
        });
        this.audioService.getState().subscribe((state) => {
          this.state = state;
        });
      });
    this.currentTrackSubscription = this.store
      .select<{ index: number; file: string }>('currentTrack')
      .subscribe(({ index, file }) => {
        this.openFile(file, index);
      });
  }

  ngOnDestroy() {
    this.currentTrackSubscription.unsubscribe();
    this.tracksSubscription.unsubscribe();
  }

  isFirstPlaying() {
    return this.currentTrack.index === 0;
  }

  isLastPlaying() {
    return this.currentTrack.index === this.tracks.length - 1;
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  previous() {
    const index = this.currentTrack.index - 1;
    const id = this.tracks[index].id;
    const file = this.trackIdToUrl[id];
    this.openFile(file, index);
  }

  next() {
    const index = this.currentTrack.index + 1;
    const id = this.tracks[index].id;
    const file = this.trackIdToUrl[id];
    this.openFile(file, index);
  }

  onSliderChangeEnd(event: any) {
    this.audioService.seekTo(event.target.value);
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe();
  }

  openFile(file: string, index: number) {
    this.currentTrack = { index, file };
    this.audioService.stop();
    this.playStream(file);
  }
}
