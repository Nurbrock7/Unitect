import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse CABMAN's full range of cable accessories: cable ties, heat shrink tubing, cable markers, ferrules, cable glands, and identification labels.",
};

type CategoryItem = { _id: string; name: string; slug: string };
type ProductItem = { _id: string; slug: string; name: string; description: string; category?: { name: string } };

async function getProducts(categorySlug?: string) {
  try {
    const { data: catData, error: catErr } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("sort_order");

    if (catErr || !catData || catData.length === 0) throw new Error("empty");
    const categories: CategoryItem[] = catData.map((c) => ({ _id: c.id, name: c.name, slug: c.slug }));

    let query = supabase
      .from("products")
      .select("id, name, slug, description, category:categories(name)")
      .eq("is_active", true)
      .order("sort_order");

    if (categorySlug) {
      const cat = catData.find((c) => c.slug === categorySlug);
      if (cat) {
        query = query.eq("category_id", cat.id);
      }
    }

    const { data: prodData, error: prodErr } = await query;
    if (prodErr) throw prodErr;

    const products: ProductItem[] = (prodData || []).map((p) => ({
      _id: String(p.id),
      slug: String(p.slug),
      name: String(p.name),
      description: String(p.description),
      category: (Array.isArray(p.category) ? p.category[0] : p.category) as { name: string } | undefined,
    }));

    return { categories, products };
  } catch {
    // Fallback to static data when DB is unavailable
    const { fallbackCategories, fallbackProducts } = await import("@/lib/fallback-data");
    const categories: CategoryItem[] = fallbackCategories;
    let products: ProductItem[] = fallbackProducts.map((p) => ({
      ...p,
      category: { name: p.category.name },
    }));
    if (categorySlug) {
      const cat = fallbackCategories.find((c) => c.slug === categorySlug);
      if (cat) {
        products = fallbackProducts
          .filter((p) => p.category.slug === categorySlug)
          .map((p) => ({ ...p, category: { name: p.category.name } }));
      }
    }
    return { categories, products };
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { categories, products } = await getProducts(category);

  return (
    <>
      {/* Header */}
      <section className="bg-primary section-padding">
        <div className="container-max">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Browse our comprehensive range of cable management and
            identification products. All products are available for bulk orders
            with competitive trade pricing.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !category
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat.slug
                    ? "bg-primary text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  slug={product.slug}
                  name={product.name}
                  description={product.description}
                  categoryName={product.category?.name}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-neutral-500">
                No products found. Products will appear here once added.
              </p>
              <Link href="/quote" className="btn-primary mt-4">
                Request a Custom Quote
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
