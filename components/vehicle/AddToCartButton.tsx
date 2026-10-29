"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { toast } from "@/components/ui/Toast";
import type { Vehicle } from "@/types/vehicle";

export function AddToCartButton({ vehicle }: { vehicle: Vehicle }) {
  const addItem = useCart((s) => s.addItem);
  const disabled = vehicle.availability !== "Available";

  function handle() {
    if (disabled) {
      toast("This vehicle is not available to add.");
      return;
    }
    const res = addItem({
      vehicleId: vehicle.id,
      slug: vehicle.slug,
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      price: vehicle.price,
      priceText: vehicle.priceText,
      image: vehicle.image,
      condition: vehicle.condition,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
    });
    toast(res.message);
  }

  return (
    <button className="btn dark" onClick={handle} disabled={disabled}>
      {!disabled && (
        <ShoppingCart className="action-icon" aria-hidden="true" />
      )}
      {disabled ? vehicle.availability : "Add to cart"}
    </button>
  );
}
