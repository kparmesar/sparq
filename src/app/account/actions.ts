"use server";

import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { upsertUserPreferences } from "@/lib/db/queries";

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}

export async function updatePreferences(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { error: "You must be signed in." };
  }

  const notifyEvents = formData.get("notifyEvents") === "on";
  const notifyProjects = formData.get("notifyProjects") === "on";
  const projectTypes = formData.getAll("projectTypes").map(String).filter(Boolean);
  const projectSites = formData.getAll("projectSites").map(String).filter(Boolean);
  const projectKeywords = (formData.get("projectKeywords") as string || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await upsertUserPreferences(session.user.id, {
    notifyEvents,
    notifyProjects,
    projectTypes,
    projectSites,
    projectKeywords,
  });

  return { success: true };
}
