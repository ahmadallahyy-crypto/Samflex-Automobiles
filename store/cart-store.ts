"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => { ok: boolean; message: string };
  removeItem: (vehicleId: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exists = get().items.some((i) => i.vehicleId === item.vehicleId);
        if (exists) {
          return { ok: false, message: "This vehicle is already in your cart." };
        }
        set({ items: [...get().items, item] });
        return { ok: true, message: "Added to cart." };
      },
      removeItem: (vehicleId) =>
        set({ items: get().items.filter((i) => i.vehicleId !== vehicleId) }),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price, 0),
      count: () => get().items.length,
    }),
    {
      name: "samflex-cart",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : localStorage
      ),
    }
  )
);
