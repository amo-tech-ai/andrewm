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
  email?: string;
  website?: string;
  social?: string;
  isNew?: boolean;
}

export interface WizardState {
  step: number;
  // Step 1: Assets
  images: File[];
  // Step 2: Collection
  collectionName: string;
  description: string;
  // Step 3: Startup Profile
  designerName: string;
  email: string;
  location: string;
  bio: string;
  website: string;
  socialHandle: string;
  // Step 4: Tags
  styleTags: string[];
  // Step 5: Market
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