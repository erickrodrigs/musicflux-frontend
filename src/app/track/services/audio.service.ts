import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StreamState } from '../models/stream-state';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private stop$ = new Subject();
  private audioObj = new Audio();
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );
  private audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next(1);
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private streamObservable(url: string): Observable<unknown> {
    return new Observable((observer) => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        this.resetState();
      };
    });
  }

  private addEvents(
    obj: HTMLAudioElement,
    events: string[],
    handler: (event: Event) => void
  ) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(
    obj: HTMLAudioElement,
    events: string[],
    handler: (event: Event) => void
  ) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  private updateStateEvents(event: Event) {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }

    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
    };
  }
}
