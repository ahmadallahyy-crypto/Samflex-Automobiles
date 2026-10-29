"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

type FavoritesState = {
  vehicleIds: string[];
  toggle: (vehicleId: string) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      vehicleIds: [],
      toggle: (vehicleId) => {
        const vehicleIds = get().vehicleIds;
        set({
          vehicleIds: vehicleIds.includes(vehicleId)
            ? vehicleIds.filter((id) => id !== vehicleId)
            : [...vehicleIds, vehicleId],
        });
      },
    }),
    {
      name: "samflex-favorites",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : localStorage,
      ),
    },
  ),
);
