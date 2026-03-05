import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const product = await Product.findOne({ slug, isActive: true }).lean();

  if (!product) {
    return { title: "Product Not Found" };
  }

  const p = product as unknown as { name: string; description: string };
  return {
    title: p.name,
    description: p.description,
  };
}

async function getProduct(slug: string) {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug, isActive: true })
      .populate("category", "name slug")
      .lean();
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const specs: [string, string][] = product.specifications
    ? Object.entries(product.specifications)
    : [];

  return (
    <>
      <section className="bg-primary section-padding pb-8">
        <div className="container-max">
          <nav className="mb-4 flex items-center gap-2 text-sm text-neutral-300">
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <span>/</span>
            {product.category && (
              <>
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="hover:text-white"
                >
                  {product.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="flex items-center justify-center rounded-xl bg-neutral-100 p-12">
              <svg
                className="h-32 w-32 text-neutral-300"
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
            </div>

            {/* Details */}
            <div>
              {product.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {product.category.name}
                </span>
              )}
              <h1 className="mt-2 text-3xl font-bold text-neutral-900">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                SKU: {product.sku}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="btn-primary text-base"
                >
                  Request a Quote
                </Link>
                <Link href="/contact" className="btn-secondary text-base">
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {specs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900">
                Technical Specifications
              </h2>
              <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full">
                  <tbody>
                    {specs.map(([key, value], i) => (
                      <tr
                        key={key}
                        className={i % 2 === 0 ? "bg-neutral-50" : "bg-white"}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-neutral-700">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Use Cases */}
          {product.useCases && product.useCases.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900">
                Common Applications
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.useCases.map((useCase: string) => (
                  <li key={useCase} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-neutral-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Need This Product?
          </h2>
          <p className="mt-2 text-neutral-600">
            Request a quote for {product.name} and get competitive pricing for
            your order.
          </p>
          <Link
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            className="btn-primary mt-6 text-base"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
