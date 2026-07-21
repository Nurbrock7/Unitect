import { supabase } from "@/lib/supabase";
import { primaryProductImage } from "@/lib/product-images";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse CABMAN's full range of cable accessories: cable ties, heat shrink tubing, cable markers, ferrules, cable glands, and identification labels.",
};

type CategoryItem = { _id: string; name: string; slug: string; description?: string };
type ProductItem = { _id: string; slug: string; name: string; description: string; category?: { name: string }; image?: string };


async function getProducts(categorySlug?: string) {
  try {
    const { data: catData, error: catErr } = await supabase
      .from("categories")
      .select("id, name, slug, description")
      .eq("is_active", true)
      .order("sort_order");

    if (catErr || !catData || catData.length === 0) throw new Error("empty");
    const categories: CategoryItem[] = catData.map((c) => ({
      _id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
    }));

    let query = supabase
      .from("products")
      .select("id, name, slug, description, images, category:categories(name)")
      .eq("is_active", true)
      .order("sort_order");

    if (categorySlug) {
      const cat = catData.find((c) => c.slug === categorySlug);
      if (cat) query = query.eq("category_id", cat.id);
    }

    const { data: prodData, error: prodErr } = await query;
    if (prodErr) throw prodErr;

    const products: ProductItem[] = (prodData || []).map((p) => ({
      _id: String(p.id),
      slug: String(p.slug),
      name: String(p.name),
      description: String(p.description),
      category: (Array.isArray(p.category) ? p.category[0] : p.category) as { name: string } | undefined,
      image: primaryProductImage(p),
    }));

    return { categories, products };
  } catch {
    const { fallbackCategories, fallbackProducts } = await import("@/lib/fallback-data");
    const categories: CategoryItem[] = fallbackCategories;
    let products: ProductItem[] = fallbackProducts.map((p) => ({
      ...p,
      category: { name: p.category.name },
      image: p.image,
    }));
    if (categorySlug) {
      const cat = fallbackCategories.find((c) => c.slug === categorySlug);
      if (cat) {
        products = fallbackProducts
          .filter((p) => p.category.slug === categorySlug)
          .map((p) => ({ ...p, category: { name: p.category.name }, image: p.image }));
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
  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <>
      {/* Header */}
      <section className="bg-primary section-padding">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Browse our comprehensive range of cable management and identification
            products. All available for bulk orders with competitive trade
            pricing.
          </p>
        </div>
      </section>

      {/* Category Grid. Deliberately dark — the category illustrations are drawn
          for a charcoal backdrop. Graded from the navy header so the switch
          reads as intentional rather than as two mismatched sections. */}
      <section className="bg-gradient-to-b from-primary-800 to-[#1a1a1a] py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-xl font-bold text-neutral-100">
            Browse by Product Line
          </h2>
          <p className="mb-8 text-sm text-neutral-400">
            Twelve product lines covering cable management, identification, and
            termination.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                slug={cat.slug}
                name={cat.name}
                description={cat.description ?? ""}
                isActive={category === cat.slug}
              />
            ))}
          </div>

          {activeCategory && (
            <div className="mt-6 flex items-center justify-between rounded-xl bg-white/5 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">{activeCategory.name}</p>
                {activeCategory.description && (
                  <p className="mt-0.5 text-xs text-neutral-400">{activeCategory.description}</p>
                )}
              </div>
              <Link href="/products" className="ml-4 flex-shrink-0 text-xs font-semibold text-accent hover:text-accent-600">
                Clear filter ×
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-neutral-50 pt-0">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-neutral-500">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                {activeCategory ? `in ${activeCategory.name}` : "across all categories"}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    slug={product.slug}
                    name={product.name}
                    description={product.description}
                    categoryName={product.category?.name}
                    image={product.image}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-neutral-500">
                No products found in this category yet.
              </p>
              <Link href="/quote" className="btn-primary mt-4 inline-block">
                Request a Custom Quote
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
