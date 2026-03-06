import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/components/AdminShell";
import AdminQuoteList from "@/components/AdminQuoteList";

export default async function AdminQuotesPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  const { data } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const quotes = (data || []).map((q) => ({
    _id: q.id,
    name: q.name,
    company: q.company,
    email: q.email,
    phone: q.phone,
    product: q.product,
    quantity: q.quantity,
    message: q.message,
    status: q.status,
    createdAt: q.created_at,
  }));

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-neutral-900">Quote Requests</h1>
      <p className="mt-1 text-sm text-neutral-500">
        View and manage incoming quote requests.
      </p>

      <div className="mt-6">
        <AdminQuoteList quotes={quotes} />
      </div>
    </AdminShell>
  );
}
