"use server";

import { supabase } from "@/lib/supabase";
import {
  verifyPassword,
  createSession,
  destroySession,
  requireAdmin,
} from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type AdminLoginState = {
  success: boolean;
  message: string;
};

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  try {
    const { data: admin } = await supabase
      .from("admins")
      .select("id, password_hash")
      .eq("email", email.toLowerCase())
      .single();

    if (!admin) {
      return { success: false, message: "Invalid credentials." };
    }

    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return { success: false, message: "Invalid credentials." };
    }

    await createSession(admin.id);
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  await destroySession();
  redirect("/admin/login");
}

export async function createProduct(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const admin = await requireAdmin();
  if (!admin) return { success: false, message: "Unauthorized" };

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const sku = formData.get("sku") as string;
  const description = formData.get("description") as string;
  const category_id = formData.get("category") as string;
  const use_cases = ((formData.get("useCases") as string) || "")
    .split("\n")
    .filter(Boolean);
  const is_featured = formData.get("isFeatured") === "on";
  const specsRaw = formData.get("specifications") as string;

  if (!name || !slug || !sku || !description || !category_id) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const specifications: Record<string, string> = {};
  if (specsRaw) {
    specsRaw
      .split("\n")
      .filter(Boolean)
      .forEach((line) => {
        const [key, ...vals] = line.split(":");
        if (key && vals.length) {
          specifications[key.trim()] = vals.join(":").trim();
        }
      });
  }

  try {
    const { error } = await supabase.from("products").insert({
      name,
      slug,
      sku,
      description,
      category_id,
      use_cases,
      is_featured,
      specifications,
    });

    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, message: "Product created successfully." };
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to create product.";
    return { success: false, message: errMsg };
  }
}

export async function updateProduct(
  productId: string,
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const admin = await requireAdmin();
  if (!admin) return { success: false, message: "Unauthorized" };

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const sku = formData.get("sku") as string;
  const description = formData.get("description") as string;
  const category_id = formData.get("category") as string;
  const use_cases = ((formData.get("useCases") as string) || "")
    .split("\n")
    .filter(Boolean);
  const is_featured = formData.get("isFeatured") === "on";
  const is_active = formData.get("isActive") === "on";
  const specsRaw = formData.get("specifications") as string;

  const specifications: Record<string, string> = {};
  if (specsRaw) {
    specsRaw
      .split("\n")
      .filter(Boolean)
      .forEach((line) => {
        const [key, ...vals] = line.split(":");
        if (key && vals.length) {
          specifications[key.trim()] = vals.join(":").trim();
        }
      });
  }

  try {
    const { error } = await supabase
      .from("products")
      .update({
        name,
        slug,
        sku,
        description,
        category_id,
        use_cases,
        is_featured,
        is_active,
        specifications,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId);

    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, message: "Product updated successfully." };
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to update product.";
    return { success: false, message: errMsg };
  }
}

export async function deleteProduct(productId: string) {
  const admin = await requireAdmin();
  if (!admin) return { success: false, message: "Unauthorized" };

  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, message: "Product deleted." };
  } catch {
    return { success: false, message: "Failed to delete product." };
  }
}

export async function updateQuoteStatus(quoteId: string, status: string) {
  const admin = await requireAdmin();
  if (!admin) return { success: false, message: "Unauthorized" };

  try {
    const { error } = await supabase
      .from("quote_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", quoteId);

    if (error) throw error;

    revalidatePath("/admin/quotes");
    return { success: true, message: "Status updated." };
  } catch {
    return { success: false, message: "Failed to update status." };
  }
}

export async function createCategory(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const admin = await requireAdmin();
  if (!admin) return { success: false, message: "Unauthorized" };

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  if (!name || !slug) {
    return { success: false, message: "Name and slug are required." };
  }

  try {
    const { error } = await supabase
      .from("categories")
      .insert({ name, slug, description });

    if (error) throw error;

    revalidatePath("/admin/products");
    return { success: true, message: "Category created." };
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to create category.";
    return { success: false, message: errMsg };
  }
}
