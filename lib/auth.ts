import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import Admin from "@/models/Admin";

const SESSION_COOKIE = "cabman_admin_session";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(adminId: string) {
  const token = Buffer.from(
    JSON.stringify({ id: adminId, ts: Date.now() })
  ).toString("base64");

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
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

  await connectToDatabase();
  const admin = await Admin.findById(session.id).lean();
  return admin;
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
