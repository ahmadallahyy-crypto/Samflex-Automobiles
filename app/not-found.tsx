import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap" style={{ padding: "120px 0 80px", textAlign: "center" }}>
      <span className="index">404 / PAGE NOT FOUND</span>
      <h1 style={{ margin: "12px 0 10px" }}>
        This page <em>isn&apos;t in the garage.</em>
      </h1>
      <p style={{ maxWidth: "560px", margin: "0 auto 28px" }}>
        The vehicle, destination, or page you were looking for may have moved or no longer exists.
      </p>
      <Link className="btn dark" href="/">
        Return home ↗
      </Link>
    </section>
  );
}
