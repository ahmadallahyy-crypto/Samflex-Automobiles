"use client";

import { useRouter, usePathname } from "next/navigation";
import { bodyTypeLabels, bodyTypes, makes } from "@/lib/vehicles";
import type { VehicleFilters } from "@/types/vehicle";

export function InventoryFilters({
  initial,
  count,
}: {
  initial: VehicleFilters;
  count: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function update(key: string, value: string) {
    const params = new URLSearchParams();
    const next = { ...initial, [key]: value || undefined };
    Object.entries(next).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params.set(k, String(v));
    });
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div data-reveal>
      <div className="section-head" style={{ marginBottom: 16 }}>
        <div className="tools">
          <span>Showing {count} vehicle{count === 1 ? "" : "s"}</span>
          <label>
            Sort{" "}
            <select
              value={initial.sort || "featured"}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="year-desc">Newest year</option>
              <option value="mileage-asc">Lowest mileage</option>
            </select>
          </label>
        </div>
      </div>

      <div className="chips">
        {[
          { label: "All", value: "" },
          ...bodyTypes.map((type) => ({ label: bodyTypeLabels[type], value: type })),
        ].map((c) => (
          <button
            key={c.value}
            type="button"
            className={`chip${(initial.bodyType || "") === c.value ? " active" : ""}`}
            onClick={() => update("bodyType", c.value)}
          >
            {c.label} ↗
          </button>
        ))}
      </div>

      <form
        className="search-form"
        style={{ marginBottom: 28 }}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const params = new URLSearchParams();
          for (const key of ["make", "condition", "bodyType", "maxPrice", "sort"]) {
            const v = fd.get(key)?.toString();
            if (v) params.set(key, v);
          }
          router.push(`${pathname}?${params}`);
        }}
      >
        <label>
          MAKE
          <select name="make" defaultValue={initial.make || ""}>
            <option value="">All makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label>
          CONDITION
          <select name="condition" defaultValue={initial.condition || ""}>
            <option value="">Any</option>
            <option>Brand New</option>
            <option>Foreign Used</option>
            <option>Nigerian Used</option>
          </select>
        </label>
        <label>
          BODY TYPE
          <select name="bodyType" defaultValue={initial.bodyType || ""}>
            <option value="">All</option>
            {bodyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          MAX BUDGET
          <select name="maxPrice" defaultValue={initial.maxPrice ? String(initial.maxPrice) : ""}>
            <option value="">Any</option>
            <option value="10000000">₦10m</option>
            <option value="20000000">₦20m</option>
            <option value="30000000">₦30m</option>
            <option value="50000000">₦50m</option>
          </select>
        </label>
        <input type="hidden" name="sort" value={initial.sort || "featured"} />
        <button className="search-btn" type="submit">
          Apply ↗
        </button>
      </form>
    </div>
  );
}
