import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unitec | Cable Accessories",
  description: "B2B/B2C online store for cable ties, heat shrink, glands, lugs, ferrules and tape."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <a href="/" className="text-xl font-bold text-brand">
              Unitec
            </a>
            <nav className="flex gap-4 text-sm font-medium text-slate-600">
              <a href="/category/cable-ties">Categories</a>
              <a href="/cart">Cart</a>
              <a href="/checkout">Checkout</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-72px)] max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
