export interface Collection {
  id: string;
  title: string;
  designer: string;
  season: string;
  imageUrl: string;
  description: string;
}

export interface Designer {
  id: string;
  name: string;
  location: string;
  bio: string;
  imageUrl: string;
  specialty: string;
}

export interface WizardState {
  step: number;
  images: File[];
  collectionName: string;
  description: string;
  designerName: string;
  email: string;
  styleTags: string[];
  priceRange: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export enum CollectionCategory {
  HAUTE_COUTURE = 'Haute Couture',
  READY_TO_WEAR = 'Ready-to-Wear',
  AVANT_GARDE = 'Avant-Garde',
  STREETWEAR = 'Luxury Streetwear'
}