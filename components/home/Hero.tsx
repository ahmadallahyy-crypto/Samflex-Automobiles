"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";

const slidesMeta = [
  {
    kicker: "A MORE CONSIDERED WAY TO BUY",
    headline: ["Find the right drive.", "Take your time."],
    desc: "Explore a considered collection of brand new, foreign used and Nigerian used vehicles.",
  },
  {
    kicker: "DETAILS THAT HELP YOU DECIDE",
    headline: ["Know what matters.", "Choose well."],
    desc: "Compare condition, price and key details before you speak with our team.",
  },
  {
    kicker: "A CLEARER WAY TO CHOOSE",
    headline: ["Your next car,", "on your terms."],
    desc: "Browse at your own pace. When you are ready, we can help confirm availability and next steps.",
  },
];

export function Hero({ featured }: { featured: Vehicle[] }) {
  const slides = featured.slice(0, 3).map((v, i) => ({
    ...slidesMeta[i % slidesMeta.length],
    image: v.image,
    slug: v.slug,
    car: v,
  }));
  const [i, setI] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => {
      setPreviousIndex(i);
      setI((x) => (x + 1) % slides.length);
    }, 7600);
    return () => clearInterval(t);
  }, [i, slides.length]);

  if (!slides.length) return null;
  const s = slides[i];

  return (
    <section className="hero">
      <div className="hero-bg hero-bg-current" key={s.image} style={{ backgroundImage: `url(${s.image})` }} />
      {previousIndex !== null && (
        <div
          className="hero-bg hero-bg-previous"
          key={slides[previousIndex].image}
          onAnimationEnd={() => setPreviousIndex(null)}
          style={{ backgroundImage: `url(${slides[previousIndex].image})` }}
        />
      )}
      <div className="hero-overlay" />
      <div className="hero-inner wrap">
        <p className="eyebrow">SAMFLEX AUTOMOBILES</p>
        <p className="kicker" key={`${s.image}-kicker`}>{s.kicker}</p>
        <h1 key={`${s.image}-headline`}>
          {s.headline[0]}
          <br />
          <em>{s.headline[1]}</em>
        </h1>
        <p className="hero-desc" key={`${s.image}-description`}>{s.desc}</p>
        <div className="actions" key={`${s.image}-actions`}>
          <Link className="btn dark" href="/inventory">
            Explore vehicles ↗
          </Link>
          <Link className="btn glass" href={`/inventory/${s.slug}`}>
            View this vehicle
          </Link>
        </div>
        <div className="hero-foot">
          <div>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span className="dash" />
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
          <div className="controls">
            <button type="button" aria-label="Previous" onClick={() => {
              setPreviousIndex(i);
              setI((x) => (x - 1 + slides.length) % slides.length);
            }}>
              ←
            </button>
            <div className="dots">
              {slides.map((_, d) => (
                <button key={d} type="button" className={d === i ? "active" : ""} aria-label={`Slide ${d + 1}`} onClick={() => {
                  setPreviousIndex(i);
                  setI(d);
                }} />
              ))}
            </div>
            <button type="button" aria-label="Next" onClick={() => {
              setPreviousIndex(i);
              setI((x) => (x + 1) % slides.length);
            }}>
              →
            </button>
          </div>
          <small>Demo listings and illustrative photography · Confirm details before travelling</small>
        </div>
      </div>
    </section>
  );
}
