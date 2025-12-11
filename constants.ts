import { NavItem, Collection, Designer } from './types';

export const APP_NAME = "ANDREW MAJTENYI";

export const BRAND_COPY = {
  heroTagline: "Fashion lives where art meets innovation.",
  subheading: "Explore curated collections, visionary designers, and immersive runway experiences.",
  footerQuote: "Defining the future of aesthetic intelligence.",
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Biography', path: '/designers' },
  { label: 'Contact', path: '/contact' },
  { label: 'Shop', path: '/shop' },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'eye-spy',
    title: 'Eye Spy',
    designer: 'Andrew Majtenyi',
    season: 'Current',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
    description: 'Black Shiny Dive Dress'
  },
  {
    id: 'madame',
    title: 'Madame de Pizan',
    designer: 'Andrew Majtenyi',
    season: 'Archive',
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=800',
    description: 'Historical reimagining.'
  },
  {
    id: 'romanov',
    title: 'Romanov Women',
    designer: 'Andrew Majtenyi',
    season: 'Archive',
    imageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e0031c?auto=format&fit=crop&q=80&w=800',
    description: 'Imperial aesthetics.'
  },
  {
    id: 'shipping',
    title: 'Modern Shipping',
    designer: 'Andrew Majtenyi',
    season: 'Archive',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    description: 'Nautical structure.'
  },
  {
    id: 'europa',
    title: 'Ice Moon of Europa',
    designer: 'Andrew Majtenyi',
    season: 'Archive',
    imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
    description: 'Futuristic cold.'
  }
];

export const MOCK_DESIGNERS: Designer[] = [
  {
    id: 'd1',
    name: 'Andrew Majtenyi',
    location: 'London, UK',
    specialty: 'Couture',
    bio: 'Merging traditional craftsmanship with cinematic storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'
  }
];

export const STYLE_TAGS = ['Minimalist', 'Avant-Garde', 'Sustainable', 'Vintage', 'Cyberpunk', 'Bohemian', 'Structural'];
