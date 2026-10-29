import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { SearchForm } from "@/components/home/SearchForm";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { bodyTypeLabels, bodyTypes, getAllVehicles, getFeaturedVehicles } from "@/lib/vehicles";
import { siteContent } from "@/lib/site-content";

const faqPreview = siteContent.faqs.slice(0, 4);

export default function HomePage() {
  const featured = getFeaturedVehicles();
  const allVehicles = getAllVehicles();
  const available = allVehicles.filter((vehicle) => vehicle.availability === "Available");
  const preview = available.slice(0, 4);
  const brandHighlights = Array.from(new Set(available.map((vehicle) => vehicle.make))
    .values())
    .slice(0, 4)
    .map((make) => {
      const vehicles = available.filter((vehicle) => vehicle.make === make);
      return {
        make,
        count: vehicles.length,
        image: vehicles[0].image,
      };
    });
  const categories = bodyTypes
    .map((type) => {
      const vehicles = available.filter((vehicle) => vehicle.bodyType === type);
      return {
        type,
        label: bodyTypeLabels[type],
        description:
          type === "SUV"
            ? "SPACE & VERSATILITY"
            : type === "Sedan"
              ? "EVERYDAY ELEGANCE"
              : type === "Coupe"
                ? "SPORTING CHARACTER"
                : type === "Pickup"
                  ? "BUILT FOR THE LONG HAUL"
                  : "COMPACT & CITY-READY",
        count: vehicles.length,
        image: vehicles[0]?.image,
      };
    })
    .filter((category) => category.count > 0 && category.image);
  const hasSuvs = available.some((vehicle) => vehicle.bodyType === "SUV");

  return (
    <main className="home-page">
      <Hero featured={featured} />

      <nav className="wrap home-shopping-tools" aria-label="Quick ways to shop" data-reveal>
        <Link href="/inventory">
          <span>01</span>
          <strong>Browse all cars</strong>
          <i aria-hidden="true">↗</i>
        </Link>
        <a href="#find-a-car">
          <span>02</span>
          <strong>Search by budget or make</strong>
          <i aria-hidden="true">↓</i>
        </a>
        {hasSuvs && (
          <Link href="/inventory?bodyType=SUV">
            <span>03</span>
            <strong>Browse SUVs</strong>
            <i aria-hidden="true">↗</i>
          </Link>
        )}
        <Link href="/contact">
          <span>{hasSuvs ? "04" : "03"}</span>
          <strong>Ask our team</strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </nav>

      <SearchForm />

      <section className="wrap home-section home-collection" data-reveal>
        <div className="section-head">
          <div>
            <span className="index">02 / THE COLLECTION</span>
            <h2>
              Selected <em>for the road ahead.</em>
            </h2>
          </div>
          <Link className="btn outline" href="/inventory">
            View all vehicles ↗
          </Link>
        </div>
        {preview.length > 0 ? (
          <div className="grid">
            {preview.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="home-empty">
            <p>There are no available vehicles to show right now.</p>
            <Link href="/contact">Speak with our team ↗</Link>
          </div>
        )}
      </section>

      {brandHighlights.length > 0 && (
        <section className="wrap home-section home-brands" data-reveal>
          <div className="section-head">
            <div>
              <span className="index">03 / BROWSE BY MAKE</span>
              <h2>
                A few names worth <em>knowing.</em>
              </h2>
            </div>
            <Link className="btn outline" href="/inventory">
              Explore the collection ↗
            </Link>
          </div>
          <div className="brand-grid">
            {brandHighlights.map((brand) => (
              <Link
                key={brand.make}
                href={`/inventory?make=${encodeURIComponent(brand.make)}`}
                className="brand-card"
                aria-label={`Browse ${brand.count} available ${brand.make} vehicles`}
              >
                <img src={brand.image} alt="" loading="lazy" />
                <span>
                  <small>{brand.count} available</small>
                  <b>{brand.make}</b>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="wrap home-section home-types" data-reveal>
          <div className="section-head">
            <div>
              <span className="index">04 / FIND YOUR SHAPE</span>
              <h2>
                Different roads. <em>Different drives.</em>
              </h2>
            </div>
          </div>
          <div className="type-grid">
            {categories.map((category, index) => (
              <Link
                key={category.type}
                href={`/inventory?bodyType=${category.type}`}
                className="type-card"
                aria-label={`Browse ${category.count} available ${category.label.toLowerCase()}`}
              >
                <img src={category.image} alt="" loading="lazy" />
                <span>
                  <small>
                    {String(index + 1).padStart(2, "0")} / {category.description}
                  </small>
                  <b>{category.label}</b>
                  <i>{category.count} available ↗</i>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="home-approach">
        <div className="wrap home-approach-inner">
          <div className="home-approach-copy">
            <span className="index" data-reveal>
              05 / THE SAMFLEX APPROACH
            </span>
            <h2 data-reveal>
              <span className="approach-heading-line">Good decisions start with</span>
              <span className="approach-heading-line">
                <em>good details.</em>
              </span>
            </h2>
            <p data-reveal>
              Compare condition, price and key specifications in your own time. When you are ready, our team can help
              confirm availability and talk through inspection and delivery options.
            </p>
            <Link className="btn home-approach-link" href="/about" data-reveal>
              Get to know Samflex ↗
            </Link>
          </div>
          <div className="home-process">
            {siteContent.process.map((item) => (
              <div key={item.step} className="home-process-item" data-reveal>
                <span>{String(item.step).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap home-section home-faq" data-reveal>
        <div className="faq-preview">
          <div className="section-head faq-head">
            <div>
              <span className="index">06 / GOOD TO KNOW</span>
              <h2>
                Before you <em>make a move.</em>
              </h2>
            </div>
            <Link className="btn outline" href="/faq">
              All questions ↗
            </Link>
          </div>
          <div className="faq-list">
            {faqPreview.map((item) => (
              <article key={item.question} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-banner home-contact" data-reveal>
        <div className="banner-bg" />
        <div className="banner-shade" />
        <div className="wrap banner-content">
          <span className="index">07 / A CONVERSATION, NOT A COMMITMENT</span>
          <h2>
            Let’s find your <em>next car.</em>
          </h2>
          <p>
            Share your budget, preferred model or questions. Our team will help
            you compare options and confirm availability.
          </p>
          <Link className="btn home-contact-button" href="/contact">
            Talk to Samflex ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
