import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about buying cars with Samflex Automobiles — delivery, inspection, foreign used vs Nigerian used, and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-title" data-reveal>
        <span className="index">HELP</span>
        <h1>
          Frequently asked <em>questions.</em>
        </h1>
      </div>
      <div className="faq-list" data-reveal>
        {siteContent.faqs.map((f) => (
          <details key={f.question} className="faq-item">
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
