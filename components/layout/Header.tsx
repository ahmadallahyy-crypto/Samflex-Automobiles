"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/store/cart-store";

const links = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.items.length);

  return (
    <header className="header">
      <Link className="brand" href="/">
        <span className="logo" aria-hidden="true">
          S
        </span>
        <span className="brand-copy">
          <b>SAMFLEX</b>
          <small>Automobiles</small>
        </span>
      </Link>
      <nav className={`nav${open ? " open" : ""}`} id="nav" aria-label="Main">
        <ul>
          {links.map((link) => {
            const current =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="header-actions">
        <button
          className="menu-btn"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <Link href="/cart" className="cart-btn" aria-label={`Cart, ${count} items`}>
          <ShoppingCart className="action-icon" aria-hidden="true" />
          Cart
          {count > 0 && <span className="cart-count">{count}</span>}
        </Link>
        <Link className="head-cta" href="/contact">
          Talk to us ↗
        </Link>
      </div>
    </header>
  );
}
