/**
 * Samflex Automobiles — Core TypeScript types
 * Ready for Next.js App Router + TypeScript
 */

export type VehicleCondition = "Brand New" | "Foreign Used" | "Nigerian Used";
export type BodyType = "SUV" | "Sedan" | "Coupe" | "Pickup" | "Hatchback";
export type Transmission = "Automatic" | "Manual";
export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Availability = "Available" | "Reserved" | "Sold";

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  condition: VehicleCondition;
  bodyType: BodyType;
  price: number;
  priceText: string;
  mileage: number;
  mileageText: string;
  transmission: Transmission;
  fuel: FuelType;
  colour: string;
  availability: Availability;
  featured: boolean;
  features: string[];
  description: string;
  /** Primary image URL (demo: Unsplash). Later: uploaded paths */
  image: string;
  /** Additional gallery images — owner can add more later */
  gallery: string[];
  /** Optional inspection / stock location note */
  locationNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFilters {
  make?: string;
  condition?: VehicleCondition | "";
  bodyType?: BodyType | "";
  transmission?: Transmission | "";
  availability?: Availability | "";
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "year-desc" | "mileage-asc";
}

export interface SiteContact {
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  address: string;
  coverage: string;
}

export interface SiteSocialLink {
  label: string;
  url: string;
}

export interface SiteContent {
  brandName: string;
  tagline: string;
  shortAbout: string;
  longAbout: string[];
  whyUs: { title: string; text: string }[];
  process: { step: number; title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  contact: SiteContact;
  socialLinks: SiteSocialLink[];
}
