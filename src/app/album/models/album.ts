export interface Album {
  id: number;
  title: string;
  coverUrl: string;
  releaseDate: Date;
  artists: {
    id: number;
    name: string;
  }[];
}
