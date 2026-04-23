import { eq, desc, ilike, or, sql } from "drizzle-orm";
import { db } from "./index";
import {
  projects,
  events,
  showcase,
  blogPosts,
  type Project,
  type Event as DbEvent,
  type ShowcaseItem,
  type BlogPost,
} from "./schema";

// Re-export types for convenience
export type { Project, DbEvent, ShowcaseItem, BlogPost };

// --------------- Projects ---------------

export async function getProjects(filters?: {
  type?: string;
  status?: string;
  search?: string;
  site?: string;
}): Promise<Project[]> {
  const conditions = [];
  if (filters?.type && filters.type !== "all")
    conditions.push(eq(projects.type, filters.type as Project["type"]));
  if (filters?.status && filters.status !== "all")
    conditions.push(eq(projects.status, filters.status as Project["status"]));
  if (filters?.site && filters.site !== "all")
    conditions.push(sql`${filters.site} = ANY(${projects.site})`);
  if (filters?.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(ilike(projects.title, term), ilike(projects.description, term))!
    );
  }

  const query = db.select().from(projects).orderBy(desc(projects.createdAt));
  if (conditions.length > 0) {
    return query.where(
      conditions.length === 1
        ? conditions[0]
        : sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`
    );
  }
  return query;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return rows[0];
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: projects.slug }).from(projects);
  return rows.map((r) => r.slug);
}

// --------------- Events ---------------

export async function getEvents(): Promise<DbEvent[]> {
  return db.select().from(events).orderBy(desc(events.date));
}

export async function getEventBySlug(slug: string): Promise<DbEvent | undefined> {
  const rows = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
  return rows[0];
}

export async function getAllEventSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: events.slug }).from(events);
  return rows.map((r) => r.slug);
}

// --------------- Showcase ---------------

export async function getShowcaseItems(category?: string): Promise<ShowcaseItem[]> {
  const query = db.select().from(showcase).orderBy(desc(showcase.date));
  if (category && category !== "all") {
    return query.where(eq(showcase.category, category as ShowcaseItem["category"]));
  }
  return query;
}

// --------------- Blog ---------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return rows[0];
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: blogPosts.slug }).from(blogPosts);
  return rows.map((r) => r.slug);
}

// --------------- Aggregates (for homepage) ---------------

export async function getLatestProjects(limit = 3): Promise<Project[]> {
  return db.select().from(projects).orderBy(desc(projects.createdAt)).limit(limit);
}

export async function getUpcomingEvents(limit = 3): Promise<DbEvent[]> {
  return db
    .select()
    .from(events)
    .where(sql`${events.date} >= NOW()`)
    .orderBy(events.date)
    .limit(limit);
}

export async function getLatestShowcase(limit = 3): Promise<ShowcaseItem[]> {
  return db.select().from(showcase).orderBy(desc(showcase.date)).limit(limit);
}
