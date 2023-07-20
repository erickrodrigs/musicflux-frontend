/* eslint-disable @typescript-eslint/no-explicit-any */
import { Album } from '../../album/models/album';
import { Artist } from '../../artist/models/artist';
import { Track } from '../../track/models/track';

export interface SearchResult {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  playlists: any[];
  [key: string]: any;
}
