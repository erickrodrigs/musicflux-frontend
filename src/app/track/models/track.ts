export interface Track {
  id: number;
  title: string;
  length: number;
  numberOfPlays: number;
  liked: boolean;
  album: {
    id: number;
    title: string;
    coverUrl: string;
  };
  artists: {
    id: number;
    name: string;
  }[];
  genres: string[];
}
