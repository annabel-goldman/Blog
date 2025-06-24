// Base content interface
export interface BaseContent {
  id: string;
  slug: string;
  title: string;
  date_display: string; // Allows fictional dates
  created_at: string;
  updated_at: string;
}

// Archive Post - Photo essays styled as historical records
export interface ArchivePost extends BaseContent {
  type: 'archive';
  images: ArchiveImage[];
  caption: string;
  body: string;
  archivist_notes?: string;
  location?: string;
  era?: string;
  tags: string[];
}

export interface ArchiveImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  order: number;
}

// Gazette Article - Long-form written content
export interface GazetteArticle extends BaseContent {
  type: 'gazette';
  author: string;
  author_bio?: string;
  author_portrait?: string;
  subtitle?: string;
  body: string;
  tags: string[];
  featured?: boolean;
  editor_pick?: boolean;
}

// Index Item - Fictional catalog items
export interface IndexItem extends BaseContent {
  type: 'index';
  image: string;
  short_description: string;
  full_description: string;
  provenance: string;
  status: 'Lost' | 'Burned' | 'Sold' | 'Gifted' | 'In Collection' | 'On Display' | 'Misplaced';
  era: string;
  category: string;
  owner?: string;
  estimated_value?: string;
  location?: string;
}

// Salon Entry - User submissions
export interface SalonEntry extends BaseContent {
  type: 'salon';
  pseudonym: string;
  message: string;
  prompt: string;
  approved: boolean;
  timestamp: string;
}

// Navigation
export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

// Site configuration
export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  navigation: NavigationItem[];
}

// Content filters
export interface ContentFilters {
  tags?: string[];
  era?: string;
  category?: string;
  status?: string;
  author?: string;
}

// API responses
export interface ContentResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form data types
export interface SalonSubmissionForm {
  pseudonym: string;
  message: string;
  prompt: string;
}

// Utility types
export type ContentType = 'archive' | 'gazette' | 'index' | 'salon';
export type AllContent = ArchivePost | GazetteArticle | IndexItem | SalonEntry; 