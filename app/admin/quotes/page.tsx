import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import QuoteRequest from "@/models/QuoteRequest";
import AdminShell from "@/components/AdminShell";
import AdminQuoteList from "@/components/AdminQuoteList";

export default async function AdminQuotesPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  await connectToDatabase();
  const quotes = await QuoteRequest.find()
    .sort({ createdAt: -1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify(quotes));

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-neutral-900">Quote Requests</h1>
      <p className="mt-1 text-sm text-neutral-500">
        View and manage incoming quote requests.
      </p>

      <div className="mt-6">
        <AdminQuoteList quotes={serialized} />
      </div>
    </AdminShell>
  );
}
