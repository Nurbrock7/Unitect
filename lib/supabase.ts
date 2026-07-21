import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Whether real credentials are present. When false, every query fails and the
 * callers fall through to lib/fallback-data.ts.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// createClient throws on an empty URL, and it runs at module scope — so without
// this guard a missing env var takes down the entire production build rather
// than degrading to the static catalogue. The placeholder is never reachable:
// it refuses immediately, the query returns an error, and the caller falls back.
export const supabase = createClient(
  supabaseUrl || "http://127.0.0.1:1",
  supabaseKey || "unconfigured"
);
