import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Samflex Automobiles — clear decisions on brand new, foreign used and Nigerian used cars. Nationwide Nigeria.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="about" data-reveal>
        <div className="about-photo" role="img" aria-label="Automobile on a road" />
        <div className="about-copy">
          <span className="index">THE SAMFLEX APPROACH</span>
          <h2>
            Good cars.
            <br />
            <em>Clear decisions.</em>
          </h2>
          {siteContent.longAbout.map((p) => (
            <p key={p.slice(0, 24)} style={{ marginBottom: 14 }}>
              {p}
            </p>
          ))}
          <div className="points">
            {siteContent.whyUs.map((w, i) => (
              <div key={w.title}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <p>
                  <strong>{w.title}</strong>
                  <small>{w.text}</small>
                </p>
              </div>
            ))}
          </div>
          <Link className="btn dark" href="/contact">
            Get in touch ↗
          </Link>
        </div>
      </section>
      <section className="wrap" style={{ padding: "56px 0" }} data-reveal>
        <span className="index">HOW IT WORKS</span>
        <h2 style={{ margin: "10px 0 24px" }}>
          A simple <em>process.</em>
        </h2>
        <div className="process-grid">
          {siteContent.process.map((p) => (
            <div key={p.step} className="process-card">
              <div className="step">STEP {String(p.step).padStart(2, "0")}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
