"use client";

import { useState } from "react";
import { siteContent } from "@/lib/site-content";
import { toast } from "@/components/ui/Toast";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 7) {
      setStatus("Please enter a valid name and phone number.");
      return;
    }
    setStatus("Demo only — nothing was sent. Thank you for testing the form.");
    toast("Enquiry prepared (demo).");
    e.currentTarget.reset();
  }

  const c = siteContent.contact;

  return (
    <>
      <section className="contact-banner" style={{ minHeight: 380 }} data-reveal>
        <div className="banner-bg" />
        <div className="banner-shade" />
        <div className="wrap banner-content">
          <span className="index" style={{ color: "#a8b4c2" }}>
            CONTACT
          </span>
          <h2>
            Have a car
            <br />
            in <em>mind?</em>
          </h2>
          <p>Tell us what you&apos;re looking for. We work with buyers in any state in Nigeria.</p>
        </div>
      </section>

      <div className="wrap" style={{ padding: "48px 0 80px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40 }} data-reveal>
        <div>
          <span className="index">REACH US</span>
          <h2 style={{ margin: "10px 0 24px", fontSize: 28 }}>
            We&apos;re ready when <em>you are.</em>
          </h2>
          <div style={{ display: "grid", gap: 20, fontSize: 14 }}>
            {c.phone && (
              <div>
                <b style={{ fontSize: 11, letterSpacing: 1.5 }}>PHONE</b>
                <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{c.phone}</p>
              </div>
            )}
            {c.whatsapp && (
              <div>
                <b style={{ fontSize: 11, letterSpacing: 1.5 }}>WHATSAPP</b>
                <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{c.whatsapp}</p>
              </div>
            )}
            {c.email && (
              <div>
                <b style={{ fontSize: 11, letterSpacing: 1.5 }}>EMAIL</b>
                <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{c.email}</p>
              </div>
            )}
            {c.address && (
              <div>
                <b style={{ fontSize: 11, letterSpacing: 1.5 }}>ADDRESS</b>
                <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{c.address}</p>
              </div>
            )}
            <div>
              <b style={{ fontSize: 11, letterSpacing: 1.5 }}>HOURS</b>
              <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{c.hours}</p>
            </div>
            <div>
              <b style={{ fontSize: 11, letterSpacing: 1.5 }}>COVERAGE</b>
              <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{c.coverage}</p>
            </div>
          </div>
        </div>

        <form className="summary-box" style={{ position: "static" }} onSubmit={onSubmit}>
          <h2 style={{ marginBottom: 16 }}>Send an enquiry</h2>
          <div className="form-grid">
            <label>
              Your name *
              <input name="name" required minLength={2} placeholder="Full name" />
            </label>
            <div className="two">
              <label>
                Phone *
                <input name="phone" type="tel" required placeholder="+234..." />
              </label>
              <label>
                Vehicle of interest
                <input name="vehicle" placeholder="e.g. Toyota Camry" />
              </label>
            </div>
            <label>
              Topic
              <select name="topic" defaultValue="Vehicle availability">
                <option>Vehicle availability</option>
                <option>Vehicle inspection</option>
                <option>Price and payment</option>
                <option>Book a test drive</option>
                <option>Other enquiry</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={3} placeholder="Tell us what you're looking for..." />
            </label>
            <button className="btn dark full" type="submit">
              Prepare enquiry ↗
            </button>
            {status && (
              <p style={{ fontSize: 13, color: "var(--muted)" }} role="status">
                {status}
              </p>
            )}
            <p className="disclaimer">Prototype form — connect a backend or WhatsApp before collecting real enquiries.</p>
          </div>
        </form>
      </div>
    </>
  );
}
