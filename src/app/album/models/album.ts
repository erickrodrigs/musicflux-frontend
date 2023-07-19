export interface Album {
  id: number;
  title: string;
  coverUrl: string;
  releaseDate: string;
  artists: {
    id: number;
    name: string;
  }[];
}
