import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVehicleBySlug, getSimilar } from "@/lib/vehicles";
import { vehicleMetadata, vehicleJsonLd } from "@/lib/seo";
import { AddToCartButton } from "@/components/vehicle/AddToCartButton";
import { VehicleFavoriteButton } from "@/components/inventory/VehicleFavoriteButton";
import { VehicleCard } from "@/components/inventory/VehicleCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicleBySlug(slug);
  if (!v) return { title: "Vehicle not found" };
  return vehicleMetadata(v);
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const similar = getSimilar(vehicle);
  const status = vehicle.availability.toLowerCase();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd(vehicle)) }}
      />
      <div className="wrap vdp">
        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>
          <Link href="/inventory">Cars for sale</Link> / {vehicle.make} {vehicle.model}
        </p>
        <div className="vdp-grid" data-reveal>
          <div className="gallery">
            <div
              className="gallery-main"
              style={{ backgroundImage: `url(${vehicle.image})` }}
              role="img"
              aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            >
              <span className={`badge ${status}`}>{vehicle.availability}</span>
              <VehicleFavoriteButton
                vehicleId={vehicle.id}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />
            </div>
            {vehicle.gallery.length > 1 && (
              <div className="gallery-thumbs">
                {vehicle.gallery.map((url, i) => (
                  <div
                    key={i}
                    style={{
                      width: 72,
                      height: 52,
                      borderRadius: 2,
                      background: `url(${url}) center/cover`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="vdp-info">
            <span className="meta">
              {vehicle.condition} · {vehicle.year}
            </span>
            <h1>
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="trim">{vehicle.trim}</p>
            <div className="vdp-price">{vehicle.priceText}</div>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{vehicle.description}</p>
            <dl className="spec-list">
              <div>
                <dt>Mileage</dt>
                <dd>{vehicle.mileageText}</dd>
              </div>
              <div>
                <dt>Transmission</dt>
                <dd>{vehicle.transmission}</dd>
              </div>
              <div>
                <dt>Fuel</dt>
                <dd>{vehicle.fuel}</dd>
              </div>
              <div>
                <dt>Colour</dt>
                <dd>{vehicle.colour}</dd>
              </div>
              <div>
                <dt>Body type</dt>
                <dd>{vehicle.bodyType}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{vehicle.availability}</dd>
              </div>
            </dl>
            {vehicle.features.length > 0 && (
              <div className="feature-list">
                {vehicle.features.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            )}
            {vehicle.locationNote && (
              <p style={{ fontSize: 13, color: "var(--muted)" }}>{vehicle.locationNote}</p>
            )}
            <div className="vdp-actions">
              <AddToCartButton vehicle={vehicle} />
              <Link className="btn outline" href="/contact">
                Enquire ↗
              </Link>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section style={{ marginTop: 64 }} data-reveal>
            <h2 style={{ fontSize: 28, marginBottom: 24 }}>
              Similar <em>vehicles</em>
            </h2>
            <div className="grid">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
