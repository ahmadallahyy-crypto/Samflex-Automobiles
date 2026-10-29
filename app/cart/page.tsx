"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { formatNaira } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, total } = useCart();
  const sum = total();

  return (
    <div className="wrap" style={{ paddingBottom: 64 }}>
      <div className="page-title" data-reveal>
        <span className="index">YOUR CART</span>
        <h1>
          Review your <em>selection.</em>
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="empty" data-reveal>
          <h3>Your cart is empty</h3>
          <p>Browse the collection and add a vehicle to reserve or checkout.</p>
          <Link className="btn dark" href="/inventory">
            Browse cars ↗
          </Link>
        </div>
      ) : (
        <div className="cart-layout" data-reveal>
          <div>
            {items.map((item) => (
              <div key={item.vehicleId} className="cart-item">
                <div
                  className="cart-item-img"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div>
                  <h3 style={{ fontSize: 15 }}>
                    <Link href={`/inventory/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="meta" style={{ margin: "4px 0 8px" }}>
                    {item.condition}
                  </p>
                  <strong>{item.priceText}</strong>
                </div>
                <button
                  type="button"
                  className="btn outline sm"
                  onClick={() => removeItem(item.vehicleId)}
                >
                  <Trash2 className="action-icon" aria-hidden="true" />
                  Remove
                </button>
              </div>
            ))}
          </div>
          <aside className="summary-box">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Vehicles</span>
              <span>{items.length}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatNaira(sum)}</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: "12px 0 20px" }}>
              Demo checkout only. No real payment is processed.
            </p>
            <Link className="btn dark full" href="/checkout">
              Proceed to checkout ↗
            </Link>
            <Link
              className="btn outline full"
              href="/inventory"
              style={{ marginTop: 10 }}
            >
              Continue browsing
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
