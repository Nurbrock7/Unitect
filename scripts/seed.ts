// Supabase seed script
// Run: npx tsx scripts/seed.ts
// Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fallbackCategories, fallbackProducts } from "../lib/fallback-data";

// Load .env.local manually (tsx doesn't auto-load it)
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, ...vals] = trimmed.split("=");
    if (key && vals.length) {
      process.env[key.trim()] = vals.join("=").trim();
    }
  });
} catch {
  // .env.local not found, rely on existing env vars
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

// The catalogue lives in lib/fallback-data.ts — it is what the site renders when
// Supabase is unreachable, so seeding from it keeps both paths identical.
const categories = fallbackCategories.map((c) => ({
  name: c.name,
  slug: c.slug,
  description: c.description,
  sort_order: c.sortOrder,
}));

async function seed() {
  console.log("Seeding categories...");
  const { data: catData, error: catErr } = await supabase
    .from("categories")
    .upsert(categories, { onConflict: "slug" })
    .select();

  if (catErr) {
    console.error("Category seed error:", catErr);
    process.exit(1);
  }
  console.log(`  ${catData.length} categories seeded.`);

  const catMap: Record<string, string> = {};
  catData.forEach((c) => { catMap[c.slug] = c.id; });

  console.log("Seeding products...");
  const products = fallbackProducts.map((p, i) => ({
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    description: p.description,
    category_id: catMap[p.category.slug],
    images: p.image ? [p.image] : [],
    catalogue_page: p.cataloguePage ?? "",
    specifications: p.specifications,
    use_cases: p.useCases,
    is_featured: p.isFeatured,
    is_active: p.isActive,
    sort_order: i + 1,
  }));

  const missingCategory = products.filter((p) => !p.category_id);
  if (missingCategory.length > 0) {
    console.error(
      `  ${missingCategory.length} product(s) reference an unknown category:`,
      missingCategory.map((p) => p.slug).join(", ")
    );
    process.exit(1);
  }

  const withImages = products.filter((p) => p.images.length > 0).length;
  const withCatalogue = products.filter((p) => p.catalogue_page).length;
  console.log(
    `  ${products.length} products (${withImages} with photos, ${withCatalogue} with catalogue pages)`
  );

  const { data: prodData, error: prodErr } = await supabase
    .from("products")
    .upsert(products, { onConflict: "slug" })
    .select();

  if (prodErr) {
    console.error("Product seed error:", prodErr);
    process.exit(1);
  }
  console.log(`  ${prodData.length} products seeded.`);

  // Seed admin
  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@cabman.co.za";
  const adminPassword = process.env.ADMIN_PASSWORD || "cabman2024";

  // Simple hash matching lib/auth.ts
  const encoder = new TextEncoder();
  const data = encoder.encode(adminPassword + "cabman_salt_2024");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const password_hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const { error: adminErr } = await supabase
    .from("admins")
    .upsert({ email: adminEmail, password_hash, name: "Admin" }, { onConflict: "email" });

  if (adminErr) {
    console.error("Admin seed error:", adminErr);
  } else {
    console.log(`  Admin created: ${adminEmail}`);
  }

  console.log("\nSeed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
