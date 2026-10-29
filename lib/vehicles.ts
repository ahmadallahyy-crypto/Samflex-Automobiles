import { vehicles } from "@/lib/vehicles-data";
import type { BodyType, Vehicle, VehicleFilters } from "@/types/vehicle";

export const bodyTypeLabels: Record<BodyType, string> = {
  SUV: "SUVs",
  Sedan: "Sedans",
  Coupe: "Coupes",
  Pickup: "Pickups",
  Hatchback: "Hatchbacks",
};

export function getAllVehicles(): Vehicle[] {
  return vehicles;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured && v.availability === "Available");
}

export function filterVehicles(filters: VehicleFilters): Vehicle[] {
  let list = [...vehicles];

  if (filters.make) list = list.filter((v) => v.make === filters.make);
  if (filters.condition) list = list.filter((v) => v.condition === filters.condition);
  if (filters.bodyType) list = list.filter((v) => v.bodyType === filters.bodyType);
  if (filters.transmission) list = list.filter((v) => v.transmission === filters.transmission);
  if (filters.availability) list = list.filter((v) => v.availability === filters.availability);
  if (filters.maxPrice) list = list.filter((v) => v.price <= filters.maxPrice!);
  if (filters.minPrice) list = list.filter((v) => v.price >= filters.minPrice!);
  if (filters.minYear) list = list.filter((v) => v.year >= filters.minYear!);
  if (filters.maxYear) list = list.filter((v) => v.year <= filters.maxYear!);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (v) =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.trim.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      list.sort((a, b) => b.year - a.year);
      break;
    case "mileage-asc":
      list.sort((a, b) => a.mileage - b.mileage);
      break;
    default:
      list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return list;
}

export function getSimilar(vehicle: Vehicle, limit = 4): Vehicle[] {
  return vehicles
    .filter(
      (v) =>
        v.id !== vehicle.id &&
        v.availability === "Available" &&
        (v.bodyType === vehicle.bodyType || v.make === vehicle.make)
    )
    .slice(0, limit);
}

export const makes = [...new Set(vehicles.map((v) => v.make))].sort();
const allBodyTypes: BodyType[] = ["SUV", "Sedan", "Coupe", "Pickup", "Hatchback"];
export const bodyTypes = allBodyTypes.filter((type) =>
  vehicles.some((vehicle) => vehicle.bodyType === type)
);
