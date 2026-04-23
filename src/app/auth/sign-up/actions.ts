"use server";

import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmail(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  const allowedDomains = ["nhs.net", "bristol.ac.uk"];
  const emailDomain = email.split("@")[1]?.toLowerCase();
  if (!emailDomain || !allowedDomains.some((d) => emailDomain === d || emailDomain.endsWith(`.${d}`))) {
    return { error: "Sign-up is restricted to @nhs.net and @bristol.ac.uk email addresses." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const result = await auth.api.signUpEmail({
    body: { email, name, password },
    headers: await headers(),
  });

  if (!result) {
    return { error: "Failed to create account." };
  }

  redirect("/account");
}
