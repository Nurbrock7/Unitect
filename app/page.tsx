import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CABMAN | Cable Accessories & Cable Identification Specialist",
  description:
    "Cable accessories, cable identification solutions, and cable management products for electrical contractors, mining, telecom, data centres, and construction.",
};

const industries = [
  {
    name: "Mining",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
    description:
      "Heavy-duty cable accessories engineered for harsh mining environments.",
  },
  {
    name: "Electrical Contractors",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    description:
      "Professional-grade products for installation and maintenance projects.",
  },
  {
    name: "Telecommunications",
    icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
    description:
      "Precision identification and management products for network infrastructure.",
  },
  {
    name: "Data Centres",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2",
    description:
      "Colour-coded labelling and management solutions for structured cabling.",
  },
  {
    name: "Construction",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    description:
      "Durable cable solutions for commercial and industrial construction projects.",
  },
];

const whyChoose = [
  {
    title: "Industry Expertise",
    description:
      "Decades of experience supplying cable accessories to Southern Africa's leading industries.",
  },
  {
    title: "Quality Assured",
    description:
      "All products meet SANS, IEC, and international quality standards for safety and performance.",
  },
  {
    title: "Fast Turnaround",
    description:
      "Large stockholding ensures quick delivery on standard and bulk orders.",
  },
  {
    title: "Technical Support",
    description:
      "Expert team to help you select the right products for your specific application.",
  },
  {
    title: "Competitive Pricing",
    description:
      "Volume discounts and competitive B2B pricing for trade customers.",
  },
  {
    title: "Custom Solutions",
    description:
      "Bespoke cable identification and management solutions tailored to your needs.",
  },
];

async function getFeaturedProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate("category", "name")
      .limit(6)
      .lean();
    const result = JSON.parse(JSON.stringify(products));
    if (result.length > 0) return result;
    throw new Error("empty");
  } catch {
    // Fallback to static data when DB is unavailable
    const { fallbackProducts } = await import("@/lib/fallback-data");
    return fallbackProducts.filter((p) => p.isFeatured).slice(0, 6);
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.3),transparent_70%)]" />
        </div>
        <div className="container-max relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
              Trusted by Industry Leaders
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Cable Accessories &{" "}
              <span className="text-accent">Identification Solutions</span> for
              Industry
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              CABMAN is your specialist supplier of cable ties, heat shrink
              tubing, cable markers, ferrules, cable glands, and identification
              labels. Serving electrical contractors, mining, telecom, and data
              centres across Southern Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/quote" className="btn-primary text-base">
                Request a Quote
              </Link>
              <Link href="/products" className="btn-white text-base">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About / Intro Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-max">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Your Cable Accessories Partner
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              CABMAN specialises in supplying high-quality cable management and
              cable identification products to industry. From a single box of
              cable ties to large-scale project supply, we deliver the right
              products at competitive prices with expert technical support.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-neutral-50 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Wide Product Range</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Comprehensive range of cable accessories and identification solutions from trusted manufacturers.
              </p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Quality Certified</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Products meeting international standards including SANS, IEC, and UL certifications.
              </p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Fast Delivery</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Large local stockholding with national distribution for rapid order fulfilment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Industries We Serve</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Trusted supplier across Southern Africa&apos;s key industrial sectors.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {industries.map((industry) => (
              <Link key={industry.name} href="/industries" className="card text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={industry.icon} />
                  </svg>
                </div>
                <h3 className="mt-3 font-semibold text-neutral-900">{industry.name}</h3>
                <p className="mt-2 text-xs text-neutral-600">{industry.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Featured Products</h2>
              <p className="mt-2 text-neutral-600">Popular cable accessories from our product range.</p>
            </div>
            <Link href="/products" className="hidden text-sm font-semibold text-accent hover:text-accent-600 sm:block">
              View All Products &rarr;
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map(
                (product: { _id: string; slug: string; name: string; description: string; category?: { name: string } }) => (
                  <ProductCard
                    key={product._id}
                    slug={product.slug}
                    name={product.name}
                    description={product.description}
                    categoryName={product.category?.name}
                  />
                )
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Nylon Cable Ties", desc: "UV-resistant cable ties for industrial wiring and bundling applications." },
                { name: "Heat Shrink Tubing", desc: "Polyolefin heat shrink for insulation, protection, and colour coding of cables." },
                { name: "Cable Markers", desc: "Pre-printed and blank cable markers for clear circuit identification." },
                { name: "Ferrules", desc: "Insulated and uninsulated wire ferrules for secure terminal connections." },
                { name: "Cable Glands", desc: "IP-rated cable glands for secure cable entry in enclosures and panels." },
                { name: "Identification Labels", desc: "Self-laminating and thermal labels for permanent cable identification." },
              ].map((p) => (
                <ProductCard
                  key={p.name}
                  slug={p.name.toLowerCase().replace(/\s+/g, "-")}
                  name={p.name}
                  description={p.desc}
                />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Why Choose CABMAN */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Why Choose CABMAN</h2>
            <p className="mt-4 text-lg text-neutral-600">The trusted choice for cable accessories in Southern Africa.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.4),transparent_70%)]" />
        </div>
        <div className="container-max relative section-padding text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Need a Quick Quote?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Tell us what you need and our team will provide a competitive quotation within 24 hours. Volume discounts available for bulk orders.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary text-base">Request a Quote</Link>
            <Link href="/contact" className="btn-white text-base">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Future Upgrades Placeholder */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Coming Soon</h2>
            <p className="mt-4 text-neutral-600">New tools and features to make ordering even easier.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "AI Product Finder", desc: "Describe your application and get instant product recommendations." },
              { title: "Instant Quote Estimator", desc: "Get estimated pricing instantly for standard products and quantities." },
              { title: "Bulk Order System", desc: "Upload your BOM and get pricing for complete project requirements." },
              { title: "Distributor Portal", desc: "Dedicated portal for registered distributors with trade pricing." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center opacity-75">
                <h3 className="font-semibold text-neutral-700">{item.title}</h3>
                <p className="mt-2 text-xs text-neutral-500">{item.desc}</p>
                <span className="mt-3 inline-block rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
