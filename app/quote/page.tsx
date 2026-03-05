import QuoteForm from "@/components/QuoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a competitive quote for cable ties, heat shrink tubing, cable markers, ferrules, cable glands, and other cable accessories from CABMAN.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-max">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Request a Quote
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Fill in your requirements below and our team will provide a
            competitive quotation within 24 hours. Volume discounts available for
            bulk orders.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="mx-auto max-w-2xl">
            <div className="card p-8">
              <QuoteForm preselectedProduct={product} />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-900">
                  24hr Response
                </p>
                <p className="text-xs text-neutral-500">On business days</p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-900">
                  Volume Pricing
                </p>
                <p className="text-xs text-neutral-500">Bulk discounts</p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
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
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-900">
                  Expert Advice
                </p>
                <p className="text-xs text-neutral-500">Technical support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
