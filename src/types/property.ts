// Décrit les informations publiques utiles pour afficher un hôte
export type Host = {
  id: number;
  name: string;
  picture: string;
};

// Utilise une forme adaptée aux composants du frontend
export type Property = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: Host;
  ratingAverage: number;
  ratingsCount: number;
  location: string;
  equipments: string[];
  tags: string[];
  pricePerNight: number;
};
