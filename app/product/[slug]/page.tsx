import Link from "next/link";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const productName = params.slug.replace(/-/g, " ");

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">{productName}</h1>
      <p className="max-w-2xl text-slate-600">
        Detailed product information, specifications and pack-size options will be loaded from
        MongoDB via API routes.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">SKU: UNITEC-{params.slug.toUpperCase()}</p>
        <p className="mt-4 text-2xl font-bold text-brand">$12.00</p>
        <button className="mt-5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          Add to cart
        </button>
      </div>
      <Link href="/cart" className="text-sm font-medium text-brand hover:underline">
        Go to cart
      </Link>
    </section>
  );
}
