import ProductCard from "@/components/ProductCard";

const categoryProducts = [
  {
    slug: "nylon-cable-tie-200mm",
    name: "Nylon Cable Tie 200mm",
    description: "Pack of 100 with high tensile strength.",
    price: 8.5
  },
  {
    slug: "stainless-cable-tie-300mm",
    name: "Stainless Cable Tie 300mm",
    description: "Heavy-duty ties for harsh and high-temperature environments.",
    price: 24.75
  }
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, " ");

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold capitalize">Category: {title}</h1>
      <p className="text-slate-600">Browse industrial and retail options in this category.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {categoryProducts.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </section>
  );
}
