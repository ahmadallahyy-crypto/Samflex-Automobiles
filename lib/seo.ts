import type { Metadata } from "next";
import type { Vehicle } from "@/types/vehicle";

const SITE = "https://samflexautomobiles.com"; // replace with real domain
const BRAND = "Samflex Automobiles";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${BRAND} | Find Your Next Drive`,
    template: `%s | ${BRAND}`,
  },
  description:
    "Buy brand new, foreign used and Nigerian used cars. Nationwide delivery and inspection. Browse SUVs, sedans, pickups and more at Samflex Automobiles.",
  keywords: [
    "cars for sale Nigeria",
    "foreign used cars",
    "Nigerian used cars",
    "SUV for sale",
    "Samflex Automobiles",
    "buy car Nigeria",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: BRAND,
    title: `${BRAND} | Find Your Next Drive`,
    description:
      "Brand new, foreign used and Nigerian used vehicles. Nationwide support.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export function vehicleMetadata(v: Vehicle): Metadata {
  const title = `${v.year} ${v.make} ${v.model} ${v.trim}`;
  const description = `${v.condition} ${v.year} ${v.make} ${v.model} for sale at ${v.priceText}. ${v.mileageText} · ${v.transmission}. Enquire or reserve at Samflex Automobiles.`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${BRAND}`,
      description,
      images: [{ url: v.image, width: 1200, height: 750, alt: title }],
      type: "website",
    },
    alternates: { canonical: `/inventory/${v.slug}` },
  };
}

export function vehicleJsonLd(v: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${v.year} ${v.make} ${v.model}`,
    brand: { "@type": "Brand", name: v.make },
    model: v.model,
    vehicleModelDate: String(v.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: v.mileage,
      unitCode: "KMT",
    },
    color: v.colour,
    vehicleTransmission: v.transmission,
    fuelType: v.fuel,
    image: v.gallery.length ? v.gallery : [v.image],
    offers: {
      "@type": "Offer",
      price: v.price,
      priceCurrency: "NGN",
      availability:
        v.availability === "Available"
          ? "https://schema.org/InStock"
          : v.availability === "Reserved"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/SoldOut",
      url: `${SITE}/inventory/${v.slug}`,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: BRAND,
    url: SITE,
    description:
      "Samflex Automobiles — brand new, foreign used and Nigerian used vehicles. Nationwide Nigeria.",
    areaServed: { "@type": "Country", name: "Nigeria" },
  };
}
