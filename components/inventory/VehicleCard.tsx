import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { VehicleFavoriteButton } from "@/components/inventory/VehicleFavoriteButton";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const status = vehicle.availability.toLowerCase();
  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <article className="card">
      <div className="card-media">
        <Link href={`/inventory/${vehicle.slug}`}>
          <div
            className="card-img"
            style={{ backgroundImage: `url(${vehicle.image})` }}
            role="img"
            aria-label={vehicleName}
          >
            <span className={`badge ${status}`}>{vehicle.availability}</span>
          </div>
        </Link>
        <VehicleFavoriteButton
          vehicleId={vehicle.id}
          vehicleName={vehicleName}
        />
      </div>
      <div className="card-body">
        <span className="meta">
          {vehicle.condition} · {vehicle.year}
        </span>
        <h3>
          <Link href={`/inventory/${vehicle.slug}`}>
            {vehicle.make} {vehicle.model}
          </Link>
        </h3>
        <p className="trim">{vehicle.trim}</p>
        <div className="specs">
          <span>{vehicle.mileageText}</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.bodyType}</span>
        </div>
        <div className="card-foot">
          <strong>{vehicle.priceText}</strong>
          <Link className="btn dark sm" href={`/inventory/${vehicle.slug}`}>
            View ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
