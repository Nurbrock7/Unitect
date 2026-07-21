import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | CABMAN",
  description:
    "CABMAN — a South African specialist in cable accessories, cable identification solutions, and HVAC support systems. Over 10 years of industry expertise, supplying projects across Africa.",
};

const values = [
  {
    title: "10+ Years of Expertise",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    description:
      "A decade of hands-on experience in cable identification and accessories gives us the depth to advise on even the most demanding projects — from a single site to continent-wide rollouts.",
  },
  {
    title: "Pan-African Reach",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    description:
      "Headquartered in South Africa and supplying projects all the way up into Africa — mining, telecoms, data centres, and industrial builds wherever the project takes us.",
  },
  {
    title: "Quality You Can Trust",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    description:
      "Every product in our range meets SANS, IEC, and international quality standards. In environments where failure is not an option, we make sure it isn't.",
  },
  {
    title: "Now Serving HVAC",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    description:
      "We're expanding beyond cable accessories into HVAC — supplying cable accessories and mechanical support systems to HVAC contractors and refrigeration engineers across Africa.",
  },
];

const milestones = [
  {
    year: "Day One",
    title: "A Specialist is Born",
    body: "CABMAN is founded in South Africa on a straightforward idea — the local electrical industry deserves a supplier that truly knows its products, not one that treats cable accessories as an afterthought.",
  },
  {
    year: "Early Years",
    title: "Building the Foundation",
    body: "We establish deep relationships with world-class manufacturers and build a local stockholding designed for South African conditions — products that handle heat, dust, UV exposure, and the demands of tough industrial sites.",
  },
  {
    year: "Growth",
    title: "Supplying Beyond Borders",
    body: "South African at heart, but not limited by it. We begin supplying projects further into Africa — mining operations in Zambia, telecom rollouts in East Africa, industrial builds further north. The products travel as far as the projects do.",
  },
  {
    year: "Today",
    title: "Branching into HVAC",
    body: "With a decade of expertise under our belt, we take the next step — expanding into HVAC support systems to serve mechanical contractors and refrigeration engineers throughout Africa.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,rgba(204,33,33,0.4),transparent_60%)]" />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
              Who We Are
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Proudly South African.{" "}
              <span className="text-accent">Supplying Across Africa.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200">
              CABMAN is a South African specialist supplier of cable accessories,
              cable identification solutions, and HVAC support systems — driven
              by over 10 years of industry experience and an unwavering
              commitment to quality on every project, on every site, wherever
              in Africa it may be.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-base">
                Get in Touch
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
                A South African Company with Continental Reach.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-600">
                <p>
                  CABMAN was born out of frustration — the frustration of
                  watching project after project delayed, compromised, or
                  over-budget because the people supplying cable accessories
                  simply didn&apos;t understand what they were selling. After
                  more than{" "}
                  <strong className="text-neutral-800">
                    10 years working at the coalface
                  </strong>{" "}
                  of cable identification and cable accessories, our founder saw
                  a gap that needed filling: South Africa needed a true
                  specialist — not another general wholesaler with a cable tie
                  shelf.
                </p>
                <p>
                  So CABMAN was built from the ground up to be exactly that. A
                  genuine partner — one that knows the difference between a
                  nylon 66 and a nylon 12 cable tie, why ferrule crimping
                  standards matter, and which heat shrink ratio is right for
                  your specific environment and application.
                </p>
                <p>
                  Headquartered in{" "}
                  <strong className="text-neutral-800">South Africa</strong>,
                  we don&apos;t stop at the border. We supply projects all the
                  way up into Africa — from mining operations in Zambia and the
                  DRC, to telecommunications rollouts in East Africa, to
                  industrial builds further north. Wherever the project is, we
                  get the right products there.
                </p>
                <p>
                  And we&apos;re not standing still. Recognising the explosive
                  growth of the HVAC industry — both locally and across the
                  continent — CABMAN is now expanding into{" "}
                  <strong className="text-neutral-800">
                    HVAC cable accessories and support systems
                  </strong>
                  , bringing the same depth of expertise to mechanical
                  contractors and refrigeration engineers.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/quote" className="btn-primary">
                  Request a Quote
                </Link>
                <Link href="/products" className="btn-secondary">
                  View Our Products
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-primary p-8 text-center text-white">
                <div className="text-5xl font-black text-accent">10+</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-200">
                  Years Experience
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-8 text-center">
                <div className="text-4xl font-black text-primary">54</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  African Countries
                </div>
              </div>
              <div className="rounded-2xl bg-accent p-8 text-center text-white">
                <div className="text-4xl font-black">HVAC</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-red-100">
                  Now Serving
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-8 text-center">
                <div className="text-4xl font-black text-primary">B2B</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  Trade Specialist
                </div>
              </div>
              <div className="col-span-2 rounded-2xl border-2 border-primary/10 bg-primary/5 p-8 text-center">
                <p className="text-lg font-semibold italic text-primary">
                  &ldquo;The right product. The right knowledge. Delivered
                  anywhere on the continent.&rdquo;
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-500">
                  — The CABMAN Promise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
              How We Got Here
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-black text-white">
                    {i + 1}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {m.year}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-neutral-900">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              What We Stand For
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
              The Principles Behind Every Order
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              These aren&apos;t values written for a brochure. They&apos;re the
              commitments we make on every project, to every customer.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    className="h-7 w-7 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={v.icon}
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HVAC Expansion */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-primary">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-14">
                <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
                  New Service Area
                </span>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  Now Serving the HVAC Industry
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-neutral-200">
                  The HVAC sector is growing fast across South Africa and
                  beyond — in data centres, commercial buildings, hospitals,
                  and industrial facilities. CABMAN is stepping in to serve
                  this sector with the same specialist approach that electrical
                  contractors across Africa have relied on for over a decade.
                </p>
                <ul className="mt-6 space-y-3 text-neutral-200">
                  {[
                    "Cable accessories purpose-built for HVAC systems",
                    "HVAC pipe and equipment support systems",
                    "Vibration isolation and anti-vibration mounts",
                    "Strut channel, brackets & fixings",
                    "Identification and labelling for mechanical services",
                    "Supply for projects across Africa",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
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
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-8 inline-flex">
                  Enquire About HVAC Products
                </Link>
              </div>
              <div className="flex items-center justify-center bg-primary-600 p-10 lg:p-14">
                <div className="text-center text-white">
                  <svg
                    className="mx-auto h-28 w-28 text-accent/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.8}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-6 text-2xl font-bold text-white">
                    Based in South Africa.
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-neutral-300">
                    Supplying projects all the way up into Africa — wherever the
                    project is, CABMAN has the products and the knowledge to
                    support it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Contact Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Based in South Africa and supplying projects across the continent
              — whether it&apos;s a local installation or a cross-border project,
              CABMAN is ready to get you the right products, fast.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@cabman.co.za"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sales@cabman.co.za
              </a>
              <a
                href="mailto:info@cabman.co.za"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@cabman.co.za
              </a>
            </div>
            <p className="mt-6 text-sm text-neutral-500">
              Or{" "}
              <Link href="/quote" className="font-semibold text-accent hover:text-accent-600">
                request a quote online
              </Link>{" "}
              and we&apos;ll get back to you promptly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
