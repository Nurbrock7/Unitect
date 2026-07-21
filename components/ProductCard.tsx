import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  slug: string;
  name: string;
  description: string;
  categoryName?: string;
  image?: string;
};

export default function ProductCard({
  slug,
  name,
  description,
  categoryName,
  image,
}: ProductCardProps) {
  return (
    <article className="card group flex flex-col">
      {/* Product image */}
      <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-neutral-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={400}
            height={192}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <svg
            className="h-16 w-16 text-neutral-300"
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
        )}
      </div>

      {categoryName && (
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
          {categoryName}
        </span>
      )}

      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary">
        {name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
        {description.length > 120
          ? description.slice(0, 120) + "..."
          : description}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/products/${slug}`}
          className="btn-secondary flex-1 text-center text-xs"
        >
          View Details
        </Link>
        <Link
          href={`/quote?product=${encodeURIComponent(name)}`}
          className="btn-primary flex-1 text-center text-xs"
        >
          Request Quote
        </Link>
      </div>
    </article>
  );
}
