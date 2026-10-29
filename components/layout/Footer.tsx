import Link from "next/link";
import { siteContent } from "@/lib/site-content";

const socialPlatforms = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X" },
  { key: "youtube", label: "YouTube" },
  { key: "whatsapp", label: "WhatsApp" },
];

function SocialGlyph({ platform }: { platform: string }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="social-glyph-dot" cx="17.5" cy="6.5" r=".75" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 21v-8h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5h2V3.8c-.4-.1-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V10H7v3h3v8z" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 3v11.2a4.2 4.2 0 1 1-3.5-4.1v3.2a1.2 1.2 0 1 0 .5 1V3h3c.2 2.3 1.4 3.8 3.5 4.5v3.1A8.3 8.3 0 0 1 14 8.8" />
      </svg>
    );
  }
  if (platform === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 3h4.5l11.5 18h-4.5L4 3Zm0 18 7.3-8.1m1.4-1.6L20 3" />
      </svg>
    );
  }
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 7.2a2.5 2.5 0 0 0-1.8-1.8C17.6 5 12 5 12 5s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 7.2 26 26 0 0 0 2.6 12 26 26 0 0 0 3 16.8a2.5 2.5 0 0 0 1.8 1.8C6.4 19 12 19 12 19s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .4-4.8 26 26 0 0 0-.4-4.8Z" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
      <path d="M9 8.5c.6 2 2.1 3.5 4.2 4.2l1-1 2 .8c-.2 1.3-1.2 2-2.3 2-3.4-.2-6.1-3-6.2-6.2 0-1.1.7-2.1 2-2.3l.8 2-1.5.5Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const configuredSocialLinks = socialPlatforms.map((platform) => {
    const profile = siteContent.socialLinks.find((social) => {
      const label = social.label.toLowerCase();
      return label === platform.key || label.startsWith(`${platform.key} `);
    });

    return { ...platform, url: profile?.url };
  });

  return (
    <footer className="site-footer" id="top">
      <div className="footer-wrap">
        <section className="footer-hero">
          <div>
            <p className="footer-eyebrow">Samflex Automobiles</p>
            <h2 className="footer-statement">
              Your next drive starts with a conversation.
            </h2>
          </div>
          <Link className="footer-cta" href="/contact">
            Talk to us ↗
          </Link>
        </section>

        <div className="footer-grid">
          <div className="footer-brand-column">
            <Link
              className="footer-brand-mark"
              href="/"
              aria-label="Samflex Automobiles home"
            >
              S
            </Link>
            <p className="footer-wordmark">SAMFLEX</p>
            <p className="footer-tagline">Automobiles</p>
            <p className="footer-description">
              Hand-picked cars, delivered to every state in Nigeria.
            </p>
            <ul className="footer-socials" aria-label="Samflex social profiles">
              {configuredSocialLinks.map((social) => (
                <li key={social.key}>
                  {social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <SocialGlyph platform={social.key} />
                    </a>
                  ) : (
                    <span
                      role="img"
                      aria-label={`${social.label} profile link coming soon`}
                      title={`${social.label} profile link coming soon`}
                    >
                      <SocialGlyph platform={social.key} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer-column" aria-label="Explore">
            <h3>Explore</h3>
            <ul>
              <li><Link href="/inventory">Cars for sale</Link></li>
              <li><Link href="/about">About Samflex</Link></li>
              <li><Link href="/contact">Make an enquiry</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </nav>

          <nav className="footer-column" aria-label="Vehicle types">
            <h3>Vehicle types</h3>
            <ul>
              <li><Link href="/inventory?bodyType=SUV">SUVs</Link></li>
              <li><Link href="/inventory?bodyType=Sedan">Sedans</Link></li>
              <li><Link href="/inventory?bodyType=Coupe">Coupes</Link></li>
              <li><Link href="/inventory?bodyType=Pickup">Pickups</Link></li>
            </ul>
          </nav>

          <div className="footer-column footer-contact">
            <h3>Contact details</h3>
            <p>{siteContent.contact.coverage}</p>
            <p>{siteContent.contact.hours}</p>
            {siteContent.contact.phone && <p>Phone: {siteContent.contact.phone}</p>}
            {siteContent.contact.email && <p>Email: {siteContent.contact.email}</p>}
          </div>
        </div>
      </div>

      <div className="footer-watermark" aria-hidden="true">SAMFLEX</div>

      <div className="footer-bottom-bar">
        <div className="footer-wrap footer-bottom-content">
          <span>© {year} Samflex Automobiles</span>
          <span>Demo listings · Illustrative photography</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
