import Link from "next/link";

type ProductCardProps = {
  slug: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductCard({ slug, name, description, price }: ProductCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <p className="mt-4 text-lg font-bold text-brand">${price.toFixed(2)}</p>
      <Link
        href={`/product/${slug}`}
        className="mt-4 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        View product
      </Link>
    </article>
  );
}
