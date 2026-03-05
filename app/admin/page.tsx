import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import QuoteRequest from "@/models/QuoteRequest";
import Category from "@/models/Category";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  await connectToDatabase();

  const [productCount, categoryCount, totalQuotes, newQuotes] =
    await Promise.all([
      Product.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: true }),
      QuoteRequest.countDocuments(),
      QuoteRequest.countDocuments({ status: "new" }),
    ]);

  const recentQuotesRaw = await QuoteRequest.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  const recentQuotes = JSON.parse(JSON.stringify(recentQuotesRaw)) as {
    _id: string;
    name: string;
    company: string;
    product: string;
    status: string;
    createdAt: string;
  }[];

  const stats = [
    { label: "Active Products", value: productCount, href: "/admin/products" },
    { label: "Categories", value: categoryCount, href: "/admin/products" },
    { label: "Total Quotes", value: totalQuotes, href: "/admin/quotes" },
    { label: "New Quotes", value: newQuotes, href: "/admin/quotes" },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Welcome back. Here&apos;s an overview of your business.
      </p>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-neutral-500">{stat.label}</p>
              <p className="text-3xl font-bold text-neutral-900">
                {stat.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Quotes */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">
            Recent Quote Requests
          </h2>
          <Link
            href="/admin/quotes"
            className="text-sm font-medium text-accent hover:text-accent-600"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-neutral-500">
                  Name
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-neutral-500 sm:table-cell">
                  Company
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-neutral-500 md:table-cell">
                  Product
                </th>
                <th className="px-4 py-3 text-left font-medium text-neutral-500">
                  Status
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-neutral-500 lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentQuotes.length > 0 ? (
                recentQuotes.map((quote) => (
                    <tr key={String(quote._id)} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-medium text-neutral-900">
                        {quote.name}
                      </td>
                      <td className="hidden px-4 py-3 text-neutral-600 sm:table-cell">
                        {quote.company}
                      </td>
                      <td className="hidden px-4 py-3 text-neutral-600 md:table-cell">
                        {quote.product}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            quote.status === "new"
                              ? "bg-green-100 text-green-700"
                              : quote.status === "contacted"
                                ? "bg-blue-100 text-blue-700"
                                : quote.status === "quoted"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          {quote.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-neutral-500 lg:table-cell">
                        {new Date(quote.createdAt).toLocaleDateString("en-ZA")}
                      </td>
                    </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-neutral-400"
                  >
                    No quote requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
