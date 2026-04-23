"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { blogPosts, projects, showcase, events } from "@/lib/db/schema";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --------------- Blog ---------------

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = (formData.get("author") as string) || "SPARQ Committee";
  const category = formData.get("category") as "news" | "training" | "insights" | "events";
  const featured = formData.get("featured") === "on";

  await db.insert(blogPosts).values({
    title,
    slug: slugify(title),
    excerpt,
    content,
    author,
    category,
    featured,
    publishedAt: new Date().toISOString(),
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = (formData.get("author") as string) || "SPARQ Committee";
  const category = formData.get("category") as "news" | "training" | "insights" | "events";
  const featured = formData.get("featured") === "on";

  await db
    .update(blogPosts)
    .set({ title, slug: slugify(title), excerpt, content, author, category, featured, updatedAt: new Date() })
    .where(eq(blogPosts.id, id));

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  const id = Number(formData.get("id"));
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

// --------------- Projects ---------------

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as "research" | "qi" | "audit";
  const status = formData.get("status") as "active" | "completed" | "recruiting" | "planned";
  const leadAuthors = (formData.get("leadAuthors") as string).split(",").map((s) => s.trim()).filter(Boolean);
  const tags = (formData.get("tags") as string || "").split(",").map((s) => s.trim()).filter(Boolean);
  const site = formData.getAll("site").map((s) => String(s)).filter(Boolean);
  const contactEmail = (formData.get("contactEmail") as string) || null;

  await db.insert(projects).values({
    title,
    slug: slugify(title),
    description,
    type,
    status,
    leadAuthors,
    tags,
    site,
    contactEmail,
    startDate: new Date().toISOString(),
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as "research" | "qi" | "audit";
  const status = formData.get("status") as "active" | "completed" | "recruiting" | "planned";
  const leadAuthors = (formData.get("leadAuthors") as string).split(",").map((s) => s.trim()).filter(Boolean);
  const tags = (formData.get("tags") as string || "").split(",").map((s) => s.trim()).filter(Boolean);
  const site = formData.getAll("site").map((s) => String(s)).filter(Boolean);
  const contactEmail = (formData.get("contactEmail") as string) || null;

  await db
    .update(projects)
    .set({ title, slug: slugify(title), description, type, status, leadAuthors, tags, site, contactEmail, updatedAt: new Date() })
    .where(eq(projects.id, id));

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get("id"));
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

// --------------- Showcase ---------------

export async function createShowcaseItem(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as "publication" | "poster" | "presentation" | "qi" | "audit" | "other";
  const authors = (formData.get("authors") as string).split(",").map((s) => s.trim()).filter(Boolean);
  const doi = (formData.get("doi") as string) || null;
  const documentUrl = (formData.get("documentUrl") as string) || null;

  await db.insert(showcase).values({
    title,
    slug: slugify(title),
    description,
    category,
    authors,
    doi,
    documentUrl,
    date: new Date().toISOString(),
  });

  revalidatePath("/showcase");
  revalidatePath("/admin/showcase");
  redirect("/admin/showcase");
}

export async function updateShowcaseItem(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as "publication" | "poster" | "presentation" | "qi" | "audit" | "other";
  const authors = (formData.get("authors") as string).split(",").map((s) => s.trim()).filter(Boolean);
  const doi = (formData.get("doi") as string) || null;
  const documentUrl = (formData.get("documentUrl") as string) || null;

  await db
    .update(showcase)
    .set({ title, slug: slugify(title), description, category, authors, doi, documentUrl, updatedAt: new Date() })
    .where(eq(showcase.id, id));

  revalidatePath("/showcase");
  revalidatePath("/admin/showcase");
  redirect("/admin/showcase");
}

export async function deleteShowcaseItem(formData: FormData) {
  const id = Number(formData.get("id"));
  await db.delete(showcase).where(eq(showcase.id, id));
  revalidatePath("/showcase");
  revalidatePath("/admin/showcase");
  redirect("/admin/showcase");
}

// --------------- Events ---------------

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const endDate = (formData.get("endDate") as string) || null;
  const location = (formData.get("location") as string) || "";
  const isVirtual = formData.get("isVirtual") === "on";
  const registrationUrl = (formData.get("registrationUrl") as string) || null;

  await db.insert(events).values({
    title,
    slug: slugify(title),
    description,
    date: new Date(date).toISOString(),
    endDate: endDate ? new Date(endDate).toISOString() : null,
    location: isVirtual ? "Virtual" : location,
    isVirtual,
    registrationUrl,
  });

  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const endDate = (formData.get("endDate") as string) || null;
  const location = (formData.get("location") as string) || "";
  const isVirtual = formData.get("isVirtual") === "on";
  const registrationUrl = (formData.get("registrationUrl") as string) || null;

  await db
    .update(events)
    .set({
      title,
      slug: slugify(title),
      description,
      date: new Date(date).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      location: isVirtual ? "Virtual" : location,
      isVirtual,
      registrationUrl,
      updatedAt: new Date(),
    })
    .where(eq(events.id, id));

  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  const id = Number(formData.get("id"));
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}
