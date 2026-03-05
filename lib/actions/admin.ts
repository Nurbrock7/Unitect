"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Product from "@/models/Product";
import Category from "@/models/Category";
import QuoteRequest from "@/models/QuoteRequest";
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
    await connectToDatabase();
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return { success: false, message: "Invalid credentials." };
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return { success: false, message: "Invalid credentials." };
    }

    await createSession(admin._id.toString());
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
  const category = formData.get("category") as string;
  const useCases = (formData.get("useCases") as string)
    .split("\n")
    .filter(Boolean);
  const isFeatured = formData.get("isFeatured") === "on";
  const specsRaw = formData.get("specifications") as string;

  if (!name || !slug || !sku || !description || !category) {
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
    await connectToDatabase();
    await Product.create({
      name,
      slug,
      sku,
      description,
      category,
      useCases,
      isFeatured,
      specifications,
    });

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
  const category = formData.get("category") as string;
  const useCases = (formData.get("useCases") as string)
    .split("\n")
    .filter(Boolean);
  const isFeatured = formData.get("isFeatured") === "on";
  const isActive = formData.get("isActive") === "on";
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
    await connectToDatabase();
    await Product.findByIdAndUpdate(productId, {
      name,
      slug,
      sku,
      description,
      category,
      useCases,
      isFeatured,
      isActive,
      specifications,
    });

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
    await connectToDatabase();
    await Product.findByIdAndDelete(productId);
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
    await connectToDatabase();
    await QuoteRequest.findByIdAndUpdate(quoteId, { status });
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
    await connectToDatabase();
    await Category.create({ name, slug, description });
    revalidatePath("/admin/products");
    return { success: true, message: "Category created." };
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to create category.";
    return { success: false, message: errMsg };
  }
}
