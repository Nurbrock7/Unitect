import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "CABMAN supplies cable accessories and identification products to mining, electrical contractors, telecommunications, data centres, and infrastructure projects.",
};

const industries = [
  {
    name: "Mining",
    description:
      "The mining industry demands cable accessories that withstand extreme conditions. CABMAN supplies heavy-duty cable ties, UV-resistant markers, high-temperature heat shrink, and ruggedised cable glands rated for underground and surface mining operations. Our products meet the stringent safety requirements of South African mining regulations.",
    solutions: [
      "Heavy-duty UV-resistant cable ties for harsh environments",
      "Flame-retardant heat shrink tubing for safety compliance",
      "High-visibility cable markers for circuit identification underground",
      "IP68-rated cable glands for dust and water protection",
      "Self-laminating labels resistant to chemicals and abrasion",
    ],
  },
  {
    name: "Electrical Contractors",
    description:
      "Professional electrical contractors rely on CABMAN for quality cable accessories that speed up installations and ensure compliance. From residential switchboard wiring to large commercial projects, we supply the complete range of ferrules, cable ties, markers, and identification products needed for professional installations.",
    solutions: [
      "Full range of insulated ferrules for terminal connections",
      "Pre-printed cable markers for rapid circuit identification",
      "Assorted cable tie kits for panel and trunking installations",
      "Heat shrink tubing in all standard colours and sizes",
      "Cable management accessories for neat, professional installations",
    ],
  },
  {
    name: "Telecommunications",
    description:
      "Telecoms infrastructure requires precise cable identification and management. CABMAN provides colour-coded labelling systems, fibre-safe cable ties, and identification solutions that help network engineers maintain and troubleshoot complex cable installations in exchanges, cabinets, and outdoor plant.",
    solutions: [
      "Colour-coded identification labels for fibre and copper networks",
      "Low-profile cable ties for high-density patch panel environments",
      "Wrap-around cable markers for outdoor plant identification",
      "Heat shrink markers for permanent cable labelling",
      "Cable management accessories for rack and cabinet installations",
    ],
  },
  {
    name: "Data Centres",
    description:
      "Data centre environments demand structured cabling solutions with clear identification. CABMAN supplies colour-coded cable ties, printed labels, and management accessories that support hot/cold aisle configurations and make moves, adds, and changes efficient.",
    solutions: [
      "Colour-coded cable ties matching TIA-606 standards",
      "Printed self-laminating labels for patch leads and infrastructure",
      "Velcro cable ties for reusable cable management",
      "Under-floor cable management accessories",
      "High-density cable markers for structured cabling systems",
    ],
  },
  {
    name: "Infrastructure Projects",
    description:
      "Large-scale infrastructure projects from power stations to transport networks require reliable cable accessories in bulk quantities. CABMAN supports project procurement with competitive bulk pricing, technical specifications support, and reliable supply chain management for critical national infrastructure.",
    solutions: [
      "Bulk supply of cable ties in project-specific sizes",
      "Custom-printed cable markers for project specifications",
      "High-temperature heat shrink for power cable terminations",
      "Stainless steel cable ties for corrosive environments",
      "Full project supply with delivery scheduling",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-max">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Industries We Serve
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            CABMAN provides cable accessories and identification solutions
            tailored to the specific requirements of each industry sector.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max space-y-16">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className={`grid items-start gap-8 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1">
                  <span className="text-sm font-semibold text-accent">
                    {industry.name}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-neutral-900">
                  Cable Solutions for {industry.name}
                </h2>
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {industry.description}
                </p>
                <Link
                  href={`/quote?product=${encodeURIComponent(industry.name + " Solutions")}`}
                  className="btn-primary mt-6"
                >
                  Request Industry Quote
                </Link>
              </div>

              <div className="rounded-xl bg-neutral-50 p-6">
                <h3 className="mb-4 font-semibold text-neutral-900">
                  Key Solutions
                </h3>
                <ul className="space-y-3">
                  {industry.solutions.map((solution) => (
                    <li key={solution} className="flex items-start gap-3">
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
                      <span className="text-sm text-neutral-700">
                        {solution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white">
            Need Industry-Specific Solutions?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
            Our technical team can recommend the right cable accessories for your
            specific industry application. Get in touch for expert advice and
            competitive pricing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary text-base">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn-white text-base">
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
