"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SiteMotion() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("body > main");
    if (!main) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (main.classList.contains("home-page")) {
      if (prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const heroItems = main.querySelectorAll<HTMLElement>(
          ".hero-inner > .eyebrow, .hero-inner > .kicker, .hero-inner > h1, .hero-inner > .hero-desc, .hero-inner > .actions, .hero-inner > .hero-foot",
        );
        const footer = document.querySelector<HTMLElement>(".site-footer");

        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.15,
            stagger: 0.13,
            delay: 0.1,
            ease: "power2.out",
          },
        );

        main.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: target,
                start: "top 84%",
                once: true,
              },
            },
          );

          const cards = target.querySelectorAll<HTMLElement>(
            ".card, .brand-card, .type-card, .faq-item",
          );
          if (!cards.length) return;

          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              delay: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: target,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        if (footer) {
          const footerHero = footer.querySelector<HTMLElement>(".footer-hero");
          const footerGrid = footer.querySelector<HTMLElement>(".footer-grid");
          const footerWatermark = footer.querySelector<HTMLElement>(
            ".footer-watermark",
          );
          const footerBottom = footer.querySelector<HTMLElement>(
            ".footer-bottom-content",
          );
          const footerColumns = footer.querySelectorAll<HTMLElement>(
            ".footer-brand-column, .footer-column",
          );

          const footerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top 88%",
              once: true,
            },
          });

          if (footerHero) {
            footerTimeline.fromTo(
              footerHero,
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
            );
          }

          if (footerGrid && footerColumns.length) {
            footerTimeline.fromTo(
              footerColumns,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.45",
            );
          }

          if (footerWatermark) {
            footerTimeline.fromTo(
              footerWatermark,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 1.1, ease: "power2.out" },
              "-=0.3",
            );
          }

          if (footerBottom) {
            footerTimeline.fromTo(
              footerBottom,
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" },
              "-=0.35",
            );
          }
        }
      }, main);

      return () => context.revert();
    }

    if (prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observeTargets = () => {
      main.querySelectorAll("[data-reveal]").forEach((target) => {
        if (targets.has(target)) return;
        targets.add(target);
        observer.observe(target);
      });
    };

    main.classList.add("site-motion-enabled");
    observeTargets();
    const mutations = new MutationObserver(observeTargets);
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      main.classList.remove("site-motion-enabled");
    };
  }, []);

  return null;
}
