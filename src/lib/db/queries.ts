import { eq, desc, ilike, or, sql } from "drizzle-orm";
import type {
  Project,
  Event as DbEvent,
  ShowcaseItem,
  BlogPost,
} from "./schema";

// Re-export types for convenience
export type { Project, DbEvent, ShowcaseItem, BlogPost };

function getDb() {
  if (!process.env.DATABASE_URL) return null;
  // Lazy import to avoid throwing at module load when DATABASE_URL is missing
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { db } = require("./index") as typeof import("./index");
  return db;
}

function getSchema() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("./schema") as typeof import("./schema");
}

// --------------- Projects ---------------

export async function getProjects(filters?: {
  type?: string;
  status?: string;
  search?: string;
}): Promise<Project[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_PROJECTS } = await import("@/lib/mock-data");
    let results = [...MOCK_PROJECTS] as unknown as Project[];
    if (filters?.type && filters.type !== "all")
      results = results.filter((p) => p.type === filters.type);
    if (filters?.status && filters.status !== "all")
      results = results.filter((p) => p.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return results;
  }

  const { projects } = getSchema();
  const conditions = [];
  if (filters?.type && filters.type !== "all")
    conditions.push(eq(projects.type, filters.type as Project["type"]));
  if (filters?.status && filters.status !== "all")
    conditions.push(
      eq(projects.status, filters.status as Project["status"])
    );
  if (filters?.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(ilike(projects.title, term), ilike(projects.description, term))!
    );
  }

  const query = db.select().from(projects).orderBy(desc(projects.createdAt));
  if (conditions.length > 0) {
    return query.where(
      conditions.length === 1 ? conditions[0] : sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`
    );
  }
  return query;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const db = getDb();
  if (!db) {
    const { MOCK_PROJECTS } = await import("@/lib/mock-data");
    return MOCK_PROJECTS.find((p) => p.slug === slug) as unknown as
      | Project
      | undefined;
  }
  const { projects } = getSchema();
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_PROJECTS } = await import("@/lib/mock-data");
    return MOCK_PROJECTS.map((p) => p.slug);
  }
  const { projects } = getSchema();
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects);
  return rows.map((r) => r.slug);
}

// --------------- Events ---------------

export async function getEvents(): Promise<DbEvent[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_EVENTS } = await import("@/lib/mock-data");
    return MOCK_EVENTS as unknown as DbEvent[];
  }
  const { events } = getSchema();
  return db.select().from(events).orderBy(desc(events.date));
}

export async function getEventBySlug(
  slug: string
): Promise<DbEvent | undefined> {
  const db = getDb();
  if (!db) {
    const { MOCK_EVENTS } = await import("@/lib/mock-data");
    return MOCK_EVENTS.find((e) => e.slug === slug) as unknown as
      | DbEvent
      | undefined;
  }
  const { events } = getSchema();
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getAllEventSlugs(): Promise<string[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_EVENTS } = await import("@/lib/mock-data");
    return MOCK_EVENTS.map((e) => e.slug);
  }
  const { events } = getSchema();
  const rows = await db.select({ slug: events.slug }).from(events);
  return rows.map((r) => r.slug);
}

// --------------- Showcase ---------------

export async function getShowcaseItems(
  category?: string
): Promise<ShowcaseItem[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_SHOWCASE } = await import("@/lib/mock-data");
    let results = [...MOCK_SHOWCASE] as unknown as ShowcaseItem[];
    if (category && category !== "all")
      results = results.filter((s) => s.category === category);
    return results;
  }
  const { showcase } = getSchema();
  const query = db.select().from(showcase).orderBy(desc(showcase.date));
  if (category && category !== "all") {
    return query.where(
      eq(showcase.category, category as ShowcaseItem["category"])
    );
  }
  return query;
}

// --------------- Blog ---------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_BLOG_POSTS } = await import("@/lib/mock-data");
    return MOCK_BLOG_POSTS as unknown as BlogPost[];
  }
  const { blogPosts } = getSchema();
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const db = getDb();
  if (!db) {
    const { MOCK_BLOG_POSTS } = await import("@/lib/mock-data");
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug) as unknown as
      | BlogPost
      | undefined;
  }
  const { blogPosts } = getSchema();
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_BLOG_POSTS } = await import("@/lib/mock-data");
    return MOCK_BLOG_POSTS.map((p) => p.slug);
  }
  const { blogPosts } = getSchema();
  const rows = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts);
  return rows.map((r) => r.slug);
}

// --------------- Aggregates (for homepage) ---------------

export async function getLatestProjects(limit = 3): Promise<Project[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_PROJECTS } = await import("@/lib/mock-data");
    return (MOCK_PROJECTS.slice(0, limit) as unknown as Project[]);
  }
  const { projects } = getSchema();
  return db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt))
    .limit(limit);
}

export async function getUpcomingEvents(limit = 3): Promise<DbEvent[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_EVENTS } = await import("@/lib/mock-data");
    const now = new Date();
    return MOCK_EVENTS.filter((e) => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit) as unknown as DbEvent[];
  }
  const { events } = getSchema();
  return db
    .select()
    .from(events)
    .where(sql`${events.date} >= NOW()`)
    .orderBy(events.date)
    .limit(limit);
}

export async function getLatestShowcase(limit = 3): Promise<ShowcaseItem[]> {
  const db = getDb();
  if (!db) {
    const { MOCK_SHOWCASE } = await import("@/lib/mock-data");
    return MOCK_SHOWCASE.slice(0, limit) as unknown as ShowcaseItem[];
  }
  const { showcase } = getSchema();
  return db
    .select()
    .from(showcase)
    .orderBy(desc(showcase.date))
    .limit(limit);
}
