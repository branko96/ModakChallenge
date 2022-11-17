interface IThumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

export interface IArtwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  thumbnail: IThumbnail;
  date_display: string;
  artwork_type_title?: string;
  place_of_origin?: string;
  dimensions?: string;
}
