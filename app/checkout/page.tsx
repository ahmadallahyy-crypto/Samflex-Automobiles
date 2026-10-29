"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/store/cart-store";
import { formatNaira, generateOrderNumber } from "@/lib/utils";
import type { PaymentMethod, Order } from "@/types/cart";

const methods: { id: PaymentMethod; title: string; desc: string }[] = [
  {
    id: "PAY_ON_INSPECTION",
    title: "Pay on inspection",
    desc: "Reserve interest — pay after you inspect the vehicle. Most realistic for car deals.",
  },
  {
    id: "BANK_TRANSFER",
    title: "Bank transfer (demo)",
    desc: "We’ll show demo account details. Mark as paid when ready — no real transfer.",
  },
  {
    id: "CARD_DEMO",
    title: "Card payment (demo)",
    desc: "Fake card form. Always succeeds after a short delay. No real charge.",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("PAY_ON_INSPECTION");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="wrap" style={{ padding: "48px 0" }}>
        <div className="empty" data-reveal>
          <h3>Nothing to checkout</h3>
          <p>Add a vehicle to your cart first.</p>
          <Link className="btn dark" href="/inventory">
            Browse cars ↗
          </Link>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
      customerName: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || "") || undefined,
      state: String(fd.get("state") || "") || undefined,
      city: String(fd.get("city") || "") || undefined,
      fulfilment: (fd.get("fulfilment") as Order["fulfilment"]) || "inspect",
      paymentMethod: method,
      notes: String(fd.get("notes") || "") || undefined,
      items: [...items],
      status:
        method === "PAY_ON_INSPECTION"
          ? "AWAITING_INSPECTION"
          : method === "BANK_TRANSFER"
            ? "PENDING_CONFIRMATION"
            : "PAID",
      totalAmount: total(),
      createdAt: new Date().toISOString(),
    };

    if (order.customerName.length < 2 || order.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid name and phone number.");
      setLoading(false);
      return;
    }

    // Demo card delay
    if (method === "CARD_DEMO") {
      await new Promise((r) => setTimeout(r, 1500));
    }

    try {
      if (typeof window !== "undefined") {
        const raw = window.localStorage.getItem("samflex-orders");
        const prev = (() => {
          if (!raw) return [];
          try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })();

        prev.unshift(order);
        window.localStorage.setItem("samflex-orders", JSON.stringify(prev.slice(0, 20)));
      }
      clear();
      router.push(`/checkout/success?order=${order.orderNumber}&status=${order.status}`);
    } catch {
      setError("Could not save order. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="wrap" style={{ paddingBottom: 64 }}>
      <div className="page-title" data-reveal>
        <span className="index">CHECKOUT</span>
        <h1>
          Complete your <em>order.</em>
        </h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Demo checkout — no real payment is processed.
        </p>
      </div>

      <form className="checkout-layout" onSubmit={onSubmit} data-reveal>
        <div>
          <div className="summary-box" style={{ position: "static", marginBottom: 20 }}>
            <h2>Your details</h2>
            <div className="form-grid">
              <label>
                Full name *
                <input name="name" required minLength={2} placeholder="Your full name" />
              </label>
              <div className="two">
                <label>
                  Phone *
                  <input name="phone" type="tel" required minLength={7} placeholder="+234..." />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@email.com" />
                </label>
              </div>
              <div className="two">
                <label>
                  State
                  <input name="state" placeholder="e.g. Lagos" />
                </label>
                <label>
                  City
                  <input name="city" placeholder="e.g. Ikeja" />
                </label>
              </div>
              <label>
                Fulfilment preference
                <select name="fulfilment" defaultValue="inspect">
                  <option value="inspect">Inspect first, then pay</option>
                  <option value="delivery">Delivery to my state</option>
                  <option value="collect">I will collect</option>
                </select>
              </label>
              <label>
                Notes
                <textarea name="notes" rows={3} placeholder="Anything we should know?" />
              </label>
            </div>
          </div>

          <div className="summary-box" style={{ position: "static" }}>
            <h2>Payment method</h2>
            <div className="pay-options">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`pay-option${method === m.id ? " selected" : ""}`}
                  onClick={() => setMethod(m.id)}
                >
                  <span>
                    <strong>{m.title}</strong>
                    <small>{m.desc}</small>
                  </span>
                </button>
              ))}
            </div>
            {method === "BANK_TRANSFER" && (
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                Demo bank: Samflex Demo Bank · Acct 0123456789 · Use your order number as reference.
              </p>
            )}
            {method === "CARD_DEMO" && (
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                Use any test card number (e.g. 4242 4242 4242 4242). No charge is made.
              </p>
            )}
          </div>
        </div>

        <aside className="summary-box">
          <h2>Summary</h2>
          {items.map((i) => (
            <div key={i.vehicleId} className="summary-row">
              <span style={{ maxWidth: "70%" }}>{i.title}</span>
              <span>{i.priceText}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatNaira(total())}</span>
          </div>
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 13, margin: "12px 0" }} role="alert">
              {error}
            </p>
          )}
          <button className="btn dark full" type="submit" disabled={loading} style={{ marginTop: 16 }}>
            {loading ? "Processing…" : "Place order ↗"}
          </button>
          <Link href="/cart" className="btn outline full" style={{ marginTop: 10 }}>
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}
