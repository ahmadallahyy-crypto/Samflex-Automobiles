"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/store/favorites-store";

export function VehicleFavoriteButton({
  vehicleName,
  vehicleId,
}: {
  vehicleName: string;
  vehicleId: string;
}) {
  const favorite = useFavorites((state) => state.vehicleIds.includes(vehicleId));
  const toggle = useFavorites((state) => state.toggle);

  return (
    <button
      className={`vehicle-favorite${favorite ? " is-favorite" : ""}`}
      type="button"
      aria-label={`${favorite ? "Remove" : "Add"} ${vehicleName} ${favorite ? "from" : "to"} favorites`}
      aria-pressed={favorite}
      onClick={() => toggle(vehicleId)}
    >
      <Heart size={20} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
