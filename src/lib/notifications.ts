import { db } from "@/lib/db/index";
import { userPreferences } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { sendEmail } from "@/lib/email";
import { newEventEmail, newProjectEmail } from "@/lib/email-templates";

/**
 * Get emails of users who opted into event notifications.
 */
async function getEventSubscribers(): Promise<string[]> {
  const rows = await db
    .select({ email: sql<string>`neon_auth."user".email` })
    .from(userPreferences)
    .innerJoin(
      sql`neon_auth."user"`,
      sql`neon_auth."user".id::text = ${userPreferences.userId}`
    )
    .where(eq(userPreferences.notifyEvents, true));
  return rows.map((r) => r.email).filter(Boolean);
}

/**
 * Get emails of users who opted into project notifications.
 */
async function getProjectSubscribers(): Promise<string[]> {
  const rows = await db
    .select({ email: sql<string>`neon_auth."user".email` })
    .from(userPreferences)
    .innerJoin(
      sql`neon_auth."user"`,
      sql`neon_auth."user".id::text = ${userPreferences.userId}`
    )
    .where(eq(userPreferences.notifyProjects, true));
  return rows.map((r) => r.email).filter(Boolean);
}

export async function notifyNewEvent(event: {
  title: string;
  date: string;
  location: string;
  slug: string;
}) {
  try {
    const emails = await getEventSubscribers();
    if (emails.length === 0) return;

    const { subject, html } = newEventEmail(event);
    // Send individually to avoid exposing addresses
    await Promise.allSettled(
      emails.map((to) => sendEmail({ to, subject, html }))
    );
  } catch (err) {
    console.error("Failed to send event notifications:", err);
  }
}

export async function notifyNewProject(project: {
  title: string;
  type: string;
  status: string;
  site?: string;
  slug: string;
}) {
  try {
    const emails = await getProjectSubscribers();
    if (emails.length === 0) return;

    const { subject, html } = newProjectEmail(project);
    await Promise.allSettled(
      emails.map((to) => sendEmail({ to, subject, html }))
    );
  } catch (err) {
    console.error("Failed to send project notifications:", err);
  }
}
