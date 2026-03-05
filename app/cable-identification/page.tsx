import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cable Identification Solutions",
  description:
    "Learn about the importance of cable identification for safety compliance, efficiency, and maintenance. CABMAN supplies cable markers, labels, heat shrink markers, and identification accessories.",
};

const solutions = [
  {
    title: "Cable Markers",
    description:
      "Pre-printed and blank clip-on markers that snap onto cables for clear alphanumeric identification. Available in multiple sizes to suit different cable diameters.",
    features: [
      "Pre-printed A-Z, 0-9, and symbol sets",
      "Colour-coded options for phase identification",
      "Snap-on design for fast installation",
      "Resistant to chemicals and UV exposure",
    ],
  },
  {
    title: "Self-Laminating Labels",
    description:
      "Wrap-around labels with a clear laminating tail that protects the printed information from abrasion, chemicals, and environmental exposure.",
    features: [
      "Permanent adhesive for reliable attachment",
      "Clear laminating tail protects print",
      "Suitable for laser and thermal printing",
      "Available in multiple sizes and colours",
    ],
  },
  {
    title: "Heat Shrink Markers",
    description:
      "Pre-printed or printable heat shrink sleeves that provide permanent, tamper-evident cable identification. Ideal for permanent installations.",
    features: [
      "Permanent identification - cannot be removed",
      "3:1 and 2:1 shrink ratios available",
      "Compatible with standard heat guns",
      "Suitable for wire and cable marking",
    ],
  },
  {
    title: "Tag & Label Systems",
    description:
      "Rigid and flexible cable tags for switchboards, distribution boards, and cable trays. Available in various materials and attachment methods.",
    features: [
      "Tie-on, adhesive, and clip-on options",
      "UV-stabilised materials for outdoor use",
      "Custom printing available",
      "Fire-rated options for critical installations",
    ],
  },
];

const benefits = [
  {
    title: "Safety Compliance",
    description:
      "Proper cable identification is required by SANS 10142, IEC 60445, and occupational health and safety regulations. Correctly identified cables prevent electrical accidents during maintenance and emergency situations.",
  },
  {
    title: "Efficient Maintenance",
    description:
      "Clearly identified cables reduce troubleshooting time dramatically. Maintenance teams can quickly locate and isolate circuits, reducing downtime and labour costs on service calls.",
  },
  {
    title: "Installation Quality",
    description:
      "Professional cable identification is a mark of quality workmanship. It demonstrates compliance with installation standards and makes future modifications straightforward.",
  },
  {
    title: "Regulatory Requirements",
    description:
      "South African regulations require cable identification in commercial and industrial installations. Proper identification ensures your installation passes inspection and remains compliant.",
  },
];

export default function CableIdentificationPage() {
  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-max">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Cable Identification Solutions
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Proper cable identification is essential for safety, compliance, and
            efficient maintenance. CABMAN supplies a complete range of cable
            identification products for every application.
          </p>
        </div>
      </section>

      {/* Why Cable ID Matters */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900">
              Why Cable Identification Matters
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              In electrical installations, every cable must be identifiable.
              Proper identification prevents accidents, speeds up maintenance,
              and ensures regulatory compliance.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Identification Solutions */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900">
              Our Identification Products
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Choose from our range of cable identification solutions for any
              application.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {solutions.map((solution) => (
              <div key={solution.title} className="card">
                <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-neutral-100">
                  <svg
                    className="h-16 w-16 text-neutral-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {solution.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/quote?product=${encodeURIComponent(solution.title)}`}
                  className="btn-primary mt-6 w-full text-center"
                >
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-neutral-900">
              Relevant Standards & Regulations
            </h2>
            <div className="mt-8 space-y-4">
              {[
                {
                  std: "SANS 10142-1",
                  desc: "The Wiring of Premises — requires cable identification in electrical installations.",
                },
                {
                  std: "IEC 60445",
                  desc: "Basic and safety principles for man-machine interface — marking and identification.",
                },
                {
                  std: "IEC 62491",
                  desc: "Industrial cables — requirements for marking and labelling.",
                },
                {
                  std: "SANS 1574",
                  desc: "Requirements for identification of conductors and cables.",
                },
              ].map((item) => (
                <div
                  key={item.std}
                  className="flex items-start gap-4 rounded-lg border border-neutral-200 p-4"
                >
                  <span className="flex-shrink-0 rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                    {item.std}
                  </span>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white">
            Need Cable Identification Products?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
            From clip-on markers to custom-printed labels, CABMAN has the cable
            identification solution for your project. Request a quote today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary text-base">
              Request a Quote
            </Link>
            <Link href="/products" className="btn-white text-base">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
