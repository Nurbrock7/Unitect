import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CABMAN for cable accessories, cable identification products, and technical support. Phone, email, WhatsApp, or visit us in Johannesburg.",
};

const contactInfo = [
  {
    title: "Phone",
    value: "+27 (0) 11 123 4567",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    title: "Email",
    value: "info@cabman.co.za",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "WhatsApp",
    value: "+27 (0) 82 123 4567",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    title: "Address",
    value: "Johannesburg, Gauteng, South Africa",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-max">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Have a question about our products or need a quote? Get in touch
            with our team and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-neutral-900">
                Get In Touch
              </h2>
              <p className="mt-2 text-neutral-600">
                Reach out to us through any of the channels below.
              </p>

              <div className="mt-8 space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
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
                          d={info.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {info.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-neutral-600">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-neutral-900">
                  Business Hours
                </h3>
                <div className="mt-2 space-y-1 text-sm text-neutral-600">
                  <p>Monday - Friday: 08:00 - 17:00</p>
                  <p>Saturday: 08:00 - 13:00</p>
                  <p>Sunday & Public Holidays: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h2 className="mb-6 text-xl font-bold text-neutral-900">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12 overflow-hidden rounded-xl border border-neutral-200">
            <div className="flex h-64 items-center justify-center bg-neutral-100 sm:h-80">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="mt-2 text-sm text-neutral-400">
                  Google Maps placeholder - embed your map here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
