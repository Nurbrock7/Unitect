"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/lib/actions/admin";

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Quotes", href: "/admin/quotes" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
                C
              </div>
              <span className="text-lg font-bold text-primary">
                CABMAN <span className="text-xs font-normal text-neutral-400">Admin</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-neutral-700"
              target="_blank"
            >
              View Site
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 px-4 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium ${
                pathname === item.href
                  ? "border-b-2 border-primary text-primary"
                  : "text-neutral-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
