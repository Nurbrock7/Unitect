import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/components/AdminShell";
import AdminProductList from "@/components/AdminProductList";
import AdminProductForm from "@/components/AdminProductForm";
import AdminCategoryForm from "@/components/AdminCategoryForm";

export default async function AdminProductsPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  const [prodRes, catRes] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, sku, is_featured, is_active, created_at, category:categories(name)")
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("id, name, slug").order("sort_order"),
  ]);

  const products = (prodRes.data || []).map((p) => ({
    _id: String(p.id),
    name: String(p.name),
    sku: String(p.sku),
    isFeatured: Boolean(p.is_featured),
    isActive: Boolean(p.is_active),
    createdAt: String(p.created_at),
    category: (Array.isArray(p.category) ? p.category[0] : p.category) as { name: string } | undefined,
  }));

  const categories = (catRes.data || []).map((c) => ({
    _id: c.id,
    name: c.name,
  }));

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your product catalogue.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              Add Product
            </h2>
            <AdminProductForm categories={categories} />
          </div>

          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              Add Category
            </h2>
            <AdminCategoryForm />
          </div>
        </div>

        <div className="lg:col-span-2">
          <AdminProductList products={products} />
        </div>
      </div>
    </AdminShell>
  );
}
