export interface RecentlyPlayed {
  id: number;
  track: {
    id: number;
    title: string;
  };
  album: {
    id: number;
    title: string;
    coverUrl: string;
  };
  artists: {
    id: number;
    name: string;
  }[];
  createdAt: string;
}
