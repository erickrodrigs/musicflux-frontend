/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { Track } from './track/models/track';

export interface State {
  queue: Track[];
  currentTrack: { index: number; file: string };
  [key: string]: any;
}

const state: State = {
  queue: [],
  currentTrack: { index: -1, file: '' },
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(map((state) => state[name]));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
