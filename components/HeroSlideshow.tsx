"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { src: "/hero/hero-1.jpg", alt: "Cable identification tag on solar installation" },
  { src: "/hero/hero-2.jpg", alt: "Yellow cable markers in electrical cabinet" },
  { src: "/hero/hero-3.jpg", alt: "Metal embossed cable identification tag" },
  { src: "/hero/hero-4.jpg", alt: "Industrial identification labels and tags" },
  { src: "/hero/hero-5.jpg", alt: "Stainless steel cable ties on cable tray" },
  { src: "/hero/hero-6.jpg", alt: "Control panel with compressor identification labels" },
  { src: "/hero/hero-7.jpg", alt: "Yellow cable markers on network cables" },
  { src: "/hero/hero-8.jpg", alt: "Cable tray with conduit on rooftop" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[600px] overflow-hidden sm:h-[680px] lg:h-[760px]">
      {/* Slides. Only the current slide and its neighbours are mounted — the
          source images are multi-megabyte, so mounting all eight costs ~12MB. */}
      {slides.map((slide, i) => {
        const distance = Math.min(
          Math.abs(i - current),
          slides.length - Math.abs(i - current)
        );
        if (distance > 1) return null;

        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== current}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* Scrim. Weighted to the left, where the copy sits — the right side stays
          near-clear so the photography is still the thing you look at. */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/45 to-neutral-900/5" />
      {/* Vignette to seat the slide controls against bright frames. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-900/50 to-transparent" />

      {/* Content */}
      <div className="container-max relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
            Trusted by Industry Leaders
          </span>
          {/* Slides range from dark panels to bright sunsets, so the copy carries
              its own shadow rather than relying on the scrim alone. A lighter
              tint of the brand red keeps the highlight legible over photography. */}
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgb(0_0_0_/_0.5)] sm:text-5xl lg:text-6xl">
            Cable Accessories &{" "}
            <span className="text-accent-400">Identification Solutions</span> for
            Industry
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-100 [text-shadow:0_1px_8px_rgb(0_0_0_/_0.5)]">
            CABMAN is your specialist supplier of cable ties, heat shrink
            tubing, cable markers, ferrules, cable glands, and identification
            labels. Serving electrical contractors, mining, telecom, and data
            centres across Southern Africa.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/quote" className="btn-primary text-base">
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* Slide controls. Kept together in the bottom-right so they never sit on
          top of the headline or body copy. */}
      <div className="absolute bottom-6 right-4 flex items-center gap-4 sm:right-6 lg:right-8">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
            aria-label="Previous slide"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
            aria-label="Next slide"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
