import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ order?: string; status?: string }> };

export default async function SuccessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const order = sp.order || "—";
  const status = sp.status || "PENDING";

  const statusLabel: Record<string, string> = {
    AWAITING_INSPECTION: "Awaiting inspection",
    PENDING_CONFIRMATION: "Pending transfer confirmation",
    PAID: "Paid (demo)",
    RESERVED: "Reserved",
    PENDING: "Pending",
  };

  return (
    <div className="wrap">
      <div className="success-box" data-reveal>
        <p className="order-num">{order}</p>
        <h1>
          Order <em>received.</em>
        </h1>
        <p>
          Status: <strong>{statusLabel[status] || status}</strong>
          <br />
          This is a demo order stored in your browser only. No real payment was taken.
          The Samflex team would normally follow up by phone or WhatsApp.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn dark" href="/inventory">
            Browse more cars
          </Link>
          <Link className="btn outline" href="/">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
