import { cookies } from "next/headers";
import { supabase } from "./supabase";

const SESSION_COOKIE = "cabman_admin_session";

// Simple hash for demo — use bcrypt or Supabase Auth in production
async function simpleHash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "cabman_salt_2024");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string): Promise<string> {
  return simpleHash(password);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const hashed = await simpleHash(password);
  return hashed === hash;
}

export async function createSession(adminId: string) {
  const token = Buffer.from(
    JSON.stringify({ id: adminId, ts: Date.now() })
  ).toString("base64");

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function getSession(): Promise<{ id: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (Date.now() - decoded.ts > 60 * 60 * 24 * 1000) return null;
    return { id: decoded.id };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) return null;

  const { data } = await supabase
    .from("admins")
    .select("id, email, name")
    .eq("id", session.id)
    .single();

  return data;
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
