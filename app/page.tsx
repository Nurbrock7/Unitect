import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    slug: "nylon-cable-tie-200mm",
    name: "Nylon Cable Tie 200mm",
    description: "UV-resistant cable ties for industrial and consumer wiring.",
    price: 8.5
  },
  {
    slug: "heat-shrink-tube-kit",
    name: "Heat Shrink Tube Kit",
    description: "Multi-size polyolefin heat shrink assortment for panel and harness work.",
    price: 19.9
  },
  {
    slug: "pg13-cable-gland",
    name: "PG13.5 Cable Gland",
    description: "IP68 nylon cable gland with locknut for secure cable entry.",
    price: 2.49
  }
];

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unitec Cable Accessories</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Source cable ties, heat shrink, cable glands, lugs, ferrules and electrical tape for both
          B2B procurement and B2C retail orders.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </section>
  );
}
