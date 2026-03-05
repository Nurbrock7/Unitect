import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CABMAN | Cable Accessories & Cable Identification Specialist",
    template: "%s | CABMAN",
  },
  description:
    "CABMAN supplies cable management products, cable identification solutions, and cable accessories to electrical contractors, mining, telecom, data centres, and construction industries.",
  keywords: [
    "cable ties",
    "heat shrink tubing",
    "cable markers",
    "ferrules",
    "cable glands",
    "cable identification",
    "cable management",
    "cable accessories",
    "electrical supplies",
    "South Africa",
  ],
  openGraph: {
    title: "CABMAN | Cable Accessories & Cable Identification Specialist",
    description:
      "Trusted supplier of cable management and identification products for industry.",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-72px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
