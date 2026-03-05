"use client";

import { deleteProduct } from "@/lib/actions/admin";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  sku: string;
  category?: { name: string };
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
};

export default function AdminProductList({
  products,
}: {
  products: Product[];
}) {
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    await deleteProduct(id);
    setDeleting(null);
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
        <h2 className="font-semibold text-neutral-900">
          All Products ({products.length})
        </h2>
      </div>

      {products.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-neutral-900">
                    {product.name}
                  </p>
                  {product.isFeatured && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                      Featured
                    </span>
                  )}
                  {!product.isActive && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {product.sku} &middot;{" "}
                  {product.category?.name || "Uncategorized"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(product._id)}
                disabled={deleting === product._id}
                className="ml-4 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                {deleting === product._id ? "..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-sm text-neutral-400">
          No products yet. Add your first product using the form.
        </div>
      )}
    </div>
  );
}
