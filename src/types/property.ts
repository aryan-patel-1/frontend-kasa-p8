export type Host = {
  name: string;
  picture: string;
};

export type Property = {
  id: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: Host;
  rating: number;
  location: string;
  equipments: string[];
  tags: string[];
  price?: number;
};
