"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, validateCredentials } from "@/lib/admin/auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  if (!validateCredentials(username, password)) {
    return { error: "Invalid credentials." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
