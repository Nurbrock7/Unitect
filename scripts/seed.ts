// Supabase seed script
// Run: npx tsx scripts/seed.ts
// Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

const categories = [
  { name: "Cable Ties", slug: "cable-ties", description: "Nylon and stainless steel cable ties for bundling and securing cables in all environments.", sort_order: 1 },
  { name: "Heat Shrink Tubing", slug: "heat-shrink-tubing", description: "Polyolefin and specialty heat shrink tubing for insulation, protection, and colour coding.", sort_order: 2 },
  { name: "Cable Markers", slug: "cable-markers", description: "Clip-on, slide-on, and wrap-around cable markers for circuit and cable identification.", sort_order: 3 },
  { name: "Ferrules", slug: "ferrules", description: "Insulated and uninsulated wire end ferrules for secure, reliable terminal connections.", sort_order: 4 },
  { name: "Cable Glands", slug: "cable-glands", description: "IP-rated cable glands for secure cable entry into enclosures, junction boxes, and panels.", sort_order: 5 },
  { name: "Identification Labels", slug: "identification-labels", description: "Self-laminating, thermal, and pre-printed labels for permanent cable and asset identification.", sort_order: 6 },
  { name: "Cable Management Accessories", slug: "cable-management-accessories", description: "Trunking, clips, saddles, and accessories for professional cable management installations.", sort_order: 7 },
];

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
  const products = [
    { name: "Nylon Cable Tie 200mm x 4.8mm", slug: "nylon-cable-tie-200mm", sku: "CT-NYL-200", description: "General purpose UV-resistant nylon 66 cable ties. Suitable for indoor and outdoor applications.", category_id: catMap["cable-ties"], specifications: { Material: "Nylon 66", Length: "200mm", Width: "4.8mm", "Tensile Strength": "22kg", Colour: "Black / Natural" }, use_cases: ["Panel wiring", "Outdoor installations", "Cable management", "HVAC fastening"], is_featured: true, sort_order: 1 },
    { name: "Heavy Duty Cable Tie 370mm x 7.6mm", slug: "heavy-duty-cable-tie-370mm", sku: "CT-HD-370", description: "Heavy-duty UV-stabilised cable ties for demanding industrial applications.", category_id: catMap["cable-ties"], specifications: { Material: "Nylon 66", Length: "370mm", Width: "7.6mm", "Tensile Strength": "55kg", Colour: "Black" }, use_cases: ["Mining installations", "Heavy cable bundling", "Outdoor infrastructure"], is_featured: true, sort_order: 2 },
    { name: "Polyolefin Heat Shrink Tubing Kit", slug: "heat-shrink-tubing-kit", sku: "HS-KIT-001", description: "Multi-size polyolefin heat shrink assortment kit for electrical insulation and colour-coded identification.", category_id: catMap["heat-shrink-tubing"], specifications: { Material: "Polyolefin", "Shrink Ratio": "2:1", Sizes: "1.5mm to 12mm", Colours: "Black, Red, Blue, Green, Yellow, Clear" }, use_cases: ["Wire insulation", "Colour-coded identification", "Solder joint protection"], is_featured: true, sort_order: 3 },
    { name: "Dual Wall Heat Shrink with Adhesive", slug: "dual-wall-heat-shrink-adhesive", sku: "HS-DW-3-1", description: "Dual wall heat shrink tubing with internal adhesive liner for waterproof cable joints.", category_id: catMap["heat-shrink-tubing"], specifications: { Material: "Polyolefin + adhesive", "Shrink Ratio": "3:1", Colour: "Black", "Waterproof": "IP68" }, use_cases: ["Waterproof joints", "Underground cables", "Marine wiring"], is_featured: false, sort_order: 4 },
    { name: "Clip-On Cable Markers (0-9)", slug: "clip-on-cable-markers-0-9", sku: "CM-CLIP-09", description: "Pre-printed clip-on cable markers numbered 0 to 9 for quick cable identification.", category_id: catMap["cable-markers"], specifications: { Material: "PVC", Print: "0-9", "Cable Range": "1.5mm² to 6mm²", "Pack Size": "100 per number" }, use_cases: ["Distribution boards", "Circuit identification", "SANS 10142 compliance"], is_featured: true, sort_order: 5 },
    { name: "Flat Cable Markers (A-Z)", slug: "flat-cable-markers-a-z", sku: "CM-FLAT-AZ", description: "Pre-printed flat profile cable markers lettered A to Z. UV and chemical resistant.", category_id: catMap["cable-markers"], specifications: { Material: "Polyethylene", Print: "A-Z", Colour: "Yellow with black print", "UV Resistant": "Yes" }, use_cases: ["Large cable identification", "Outdoor marking", "Substations"], is_featured: false, sort_order: 6 },
    { name: "Insulated Bootlace Ferrules Kit", slug: "insulated-bootlace-ferrules-kit", sku: "FE-INS-KIT", description: "Comprehensive kit of colour-coded insulated bootlace ferrules with crimping tool.", category_id: catMap["ferrules"], specifications: { Material: "Copper + PP insulation", Sizes: "0.5mm² to 16mm²", "Colour Coding": "DIN 46228", Contents: "800 ferrules + tool" }, use_cases: ["Switchboard wiring", "Motor control panels", "PLC wiring"], is_featured: true, sort_order: 7 },
    { name: "PG13.5 Nylon Cable Gland", slug: "pg13-5-nylon-cable-gland", sku: "CG-PG13-NYL", description: "IP68-rated nylon cable gland with locknut for secure waterproof cable entry.", category_id: catMap["cable-glands"], specifications: { Material: "Nylon PA66", Thread: "PG13.5", "Cable Range": "6-12mm", IP: "IP68" }, use_cases: ["Junction boxes", "Control panels", "Outdoor enclosures"], is_featured: true, sort_order: 8 },
    { name: "Brass Cable Gland 20mm", slug: "brass-cable-gland-20mm", sku: "CG-BR-20", description: "Nickel-plated brass cable gland with EMC screening for demanding environments.", category_id: catMap["cable-glands"], specifications: { Material: "Nickel-plated brass", Thread: "M20 x 1.5", IP: "IP68", EMC: "Yes" }, use_cases: ["Hazardous areas", "Mining equipment", "Marine applications"], is_featured: false, sort_order: 9 },
    { name: "Self-Laminating Cable Labels", slug: "self-laminating-cable-labels", sku: "LB-SELF-LAM", description: "Self-laminating wrap-around cable labels with clear protective laminate.", category_id: catMap["identification-labels"], specifications: { Material: "Vinyl + laminate", Print: "Laser or thermal", "UV Resistant": "Yes" }, use_cases: ["Permanent identification", "Outdoor labelling", "Data centres"], is_featured: false, sort_order: 10 },
    { name: "Adhesive Cable Tie Mounts", slug: "adhesive-cable-tie-mounts", sku: "CMA-ADH-25", description: "Self-adhesive cable tie mounting bases for securing cable runs to flat surfaces.", category_id: catMap["cable-management-accessories"], specifications: { Material: "Nylon PA66", Base: "25mm x 25mm", Adhesive: "Acrylic foam", Pack: "100 pcs" }, use_cases: ["Panel cable routing", "Desktop management", "Wall-mounted runs"], is_featured: false, sort_order: 11 },
    { name: "Spiral Cable Wrap 12mm", slug: "spiral-cable-wrap-12mm", sku: "CMA-SPR-12", description: "Flexible polyethylene spiral wrap for bundling and protecting cable harnesses.", category_id: catMap["cable-management-accessories"], specifications: { Material: "Polyethylene", Diameter: "12mm", "Bundle Range": "10-100mm", Length: "10m" }, use_cases: ["Cable harness bundling", "Workstation management", "Machine cables"], is_featured: false, sort_order: 12 },
  ];

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
