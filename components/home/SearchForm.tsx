"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { bodyTypes, makes } from "@/lib/vehicles";

export function SearchForm() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const key of ["make", "condition", "bodyType", "maxPrice"]) {
      const v = fd.get(key)?.toString();
      if (v) params.set(key, v);
    }
    router.push(`/inventory${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <section className="search wrap" id="find-a-car" data-reveal>
      <span className="index">01 / SEARCH INVENTORY</span>
      <h2>
        Find the car that <em>fits you.</em>
      </h2>
      <form className="search-form" onSubmit={onSubmit}>
        <label>
          MAKE
          <select name="make" defaultValue="">
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
          <select name="condition" defaultValue="">
            <option value="">Any condition</option>
            <option>Brand New</option>
            <option>Foreign Used</option>
            <option>Nigerian Used</option>
          </select>
        </label>
        <label>
          BODY TYPE
          <select name="bodyType" defaultValue="">
            <option value="">All body types</option>
            {bodyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          MAXIMUM BUDGET
          <select name="maxPrice" defaultValue="">
            <option value="">Any budget</option>
            <option value="10000000">₦10 million</option>
            <option value="20000000">₦20 million</option>
            <option value="30000000">₦30 million</option>
            <option value="40000000">₦40 million</option>
            <option value="50000000">₦50 million</option>
          </select>
        </label>
        <button className="search-btn" type="submit">
          <Search className="action-icon" aria-hidden="true" />
          Search cars
        </button>
      </form>
    </section>
  );
}
