import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
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
    await connectToDatabase();
    const categoriesRaw = await Category.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .lean();
    const categories: CategoryItem[] = JSON.parse(JSON.stringify(categoriesRaw));

    let filter: Record<string, unknown> = { isActive: true };
    if (categorySlug) {
      const cat = categories.find((c) => c.slug === categorySlug);
      if (cat) {
        filter = { ...filter, category: cat._id };
      }
    }

    const productsRaw = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ sortOrder: 1 })
      .lean();
    const products: ProductItem[] = JSON.parse(JSON.stringify(productsRaw));

    if (categories.length > 0) return { categories, products };
    throw new Error("empty");
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
