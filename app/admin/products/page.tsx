import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import AdminShell from "@/components/AdminShell";
import AdminProductList from "@/components/AdminProductList";
import AdminProductForm from "@/components/AdminProductForm";
import AdminCategoryForm from "@/components/AdminCategoryForm";

export default async function AdminProductsPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  await connectToDatabase();

  const [products, categories] = await Promise.all([
    Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean(),
    Category.find().sort({ sortOrder: 1 }).lean(),
  ]);

  const serialized = {
    products: JSON.parse(JSON.stringify(products)),
    categories: JSON.parse(JSON.stringify(categories)),
  };

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
        {/* Product Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              Add Product
            </h2>
            <AdminProductForm categories={serialized.categories} />
          </div>

          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              Add Category
            </h2>
            <AdminCategoryForm />
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <AdminProductList products={serialized.products} />
        </div>
      </div>
    </AdminShell>
  );
}
