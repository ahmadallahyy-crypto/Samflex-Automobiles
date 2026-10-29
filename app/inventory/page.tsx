import type { Metadata } from "next";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { filterVehicles } from "@/lib/vehicles";
import type { VehicleFilters } from "@/types/vehicle";

export const metadata: Metadata = {
  title: "Cars for Sale",
  description:
    "Browse brand new, foreign used and Nigerian used cars at Samflex Automobiles. Filter by make, body type, budget and more.",
  alternates: { canonical: "/inventory" },
};

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function InventoryPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filters: VehicleFilters = {
    make: sp.make || "",
    condition: (sp.condition as VehicleFilters["condition"]) || "",
    bodyType: (sp.bodyType as VehicleFilters["bodyType"]) || "",
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    sort: (sp.sort as VehicleFilters["sort"]) || "featured",
  };
  const list = filterVehicles(filters);

  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <div className="page-title" style={{ paddingTop: 0 }} data-reveal>
        <span className="index">THE COLLECTION</span>
        <h1>
          Find your <em>next drive.</em>
        </h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Explore sample vehicles. Confirm availability with Samflex before you decide.
        </p>
      </div>

      <InventoryFilters initial={filters} count={list.length} />

      {list.length === 0 ? (
        <div className="empty" data-reveal>
          <h3>No matching vehicles</h3>
          <p>Try changing a filter or clear your search.</p>
        </div>
      ) : (
        <div className="grid" data-reveal>
          {list.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
