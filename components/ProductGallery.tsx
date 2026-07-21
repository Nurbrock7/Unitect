"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type GalleryItem = {
  src: string;
  /** Catalogue scans are pages of a printed spec sheet, not product photos. */
  kind: "photo" | "catalogue";
};

type ProductGalleryProps = {
  name: string;
  images: string[];
  cataloguePage?: string;
};

export default function ProductGallery({
  name,
  images,
  cataloguePage,
}: ProductGalleryProps) {
  const items: GalleryItem[] = [
    ...images.map((src): GalleryItem => ({ src, kind: "photo" })),
    ...(cataloguePage
      ? [{ src: cataloguePage, kind: "catalogue" as const }]
      : []),
  ];

  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const current = items[active];

  const step = useCallback(
    (delta: number) => {
      setActive((i) => (i + delta + items.length) % items.length);
    },
    [items.length]
  );

  // Drive the lightbox from the keyboard, and stop the page scrolling behind it.
  useEffect(() => {
    if (!zoomed) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [zoomed, step]);

  if (items.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100">
        <div className="text-center">
          <svg
            className="mx-auto h-20 w-20 text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-3 text-sm text-neutral-400">
            Product photo coming soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label={`Zoom ${name}`}
      >
        <div className="relative aspect-square">
          <Image
            src={current.src}
            alt={
              current.kind === "catalogue"
                ? `${name} catalogue page`
                : name
            }
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={
              current.kind === "catalogue"
                ? "object-contain"
                : "object-contain p-6"
            }
          />
        </div>

        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-neutral-900/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
          Click to enlarge
        </span>
      </button>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={
                item.kind === "catalogue"
                  ? "View catalogue page"
                  : `View image ${i + 1}`
              }
              aria-current={i === active}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 bg-white transition-colors ${
                i === active
                  ? "border-accent"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1"
              />
              {item.kind === "catalogue" && (
                <span className="absolute inset-x-0 bottom-0 bg-primary/85 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                  Spec
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {cataloguePage && (
        <p className="mt-3 text-xs text-neutral-500">
          Includes the full catalogue page with sizing and part numbers.
        </p>
      )}

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/90 p-4 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} enlarged`}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Previous image"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Next image"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative h-full max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={
                current.kind === "catalogue"
                  ? `${name} catalogue page`
                  : name
              }
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
