import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "fallback-dev-secret-do-not-use-in-prod"
);

const COOKIE_NAME = "sparq-admin-session";

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET);

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function verifySession(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}

export function validateCredentials(username: string, password: string): boolean {
  const validUser = process.env.ADMIN_USERNAME || "sparqadmin";
  const validPass = process.env.ADMIN_PASSWORD || "";

  if (!validPass) return false;

  // Constant-time comparison
  if (username.length !== validUser.length || password.length !== validPass.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < username.length; i++) {
    mismatch |= username.charCodeAt(i) ^ validUser.charCodeAt(i);
  }
  for (let i = 0; i < password.length; i++) {
    mismatch |= password.charCodeAt(i) ^ validPass.charCodeAt(i);
  }
  return mismatch === 0;
}
