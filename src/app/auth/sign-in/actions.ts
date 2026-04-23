"use server";

import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithEmail(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const result = await auth.api.signInEmail({
    body: { email, password },
    headers: await headers(),
  });

  if (!result) {
    return { error: "Invalid credentials." };
  }

  redirect("/account");
}
