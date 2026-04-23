import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";

// --- Enums ---
export const projectTypeEnum = pgEnum("project_type", [
  "research",
  "qi",
  "audit",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "completed",
  "recruiting",
  "planned",
]);

export const showcaseCategoryEnum = pgEnum("showcase_category", [
  "publication",
  "poster",
  "presentation",
  "qi",
  "audit",
  "other",
]);

export const blogCategoryEnum = pgEnum("blog_category", [
  "news",
  "training",
  "insights",
  "events",
]);

// --- Tables ---
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  description: text("description").notNull(),
  type: projectTypeEnum("type").notNull(),
  status: projectStatusEnum("status").notNull().default("planned"),
  specialty: text("specialty").array().notNull().default([]),
  tags: text("tags").array().notNull().default([]),
  leadAuthors: text("lead_authors").array().notNull().default([]),
  startDate: timestamp("start_date", { mode: "string" }),
  site: text("site").array().notNull().default([]),
  contactEmail: varchar("contact_email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  description: text("description").notNull(),
  date: timestamp("date", { mode: "string" }).notNull(),
  endDate: timestamp("end_date", { mode: "string" }),
  location: varchar("location", { length: 300 }).notNull(),
  isVirtual: boolean("is_virtual").notNull().default(false),
  registrationUrl: varchar("registration_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const showcase = pgTable("showcase", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  category: showcaseCategoryEnum("category").notNull(),
  authors: text("authors").array().notNull().default([]),
  description: text("description").notNull(),
  date: timestamp("date", { mode: "string" }).notNull(),
  doi: varchar("doi", { length: 255 }),
  documentUrl: varchar("document_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  author: varchar("author", { length: 200 }).notNull().default("SPARQ Committee"),
  category: blogCategoryEnum("category").notNull(),
  publishedAt: timestamp("published_at", { mode: "string" }).notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- User Preferences ---
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  notifyEvents: boolean("notify_events").notNull().default(false),
  notifyProjects: boolean("notify_projects").notNull().default(false),
  projectTypes: text("project_types").array().notNull().default([]),
  projectSites: text("project_sites").array().notNull().default([]),
  projectKeywords: text("project_keywords").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Types ---
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type ShowcaseItem = typeof showcase.$inferSelect;
export type NewShowcaseItem = typeof showcase.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type UserPreference = typeof userPreferences.$inferSelect;
export type NewUserPreference = typeof userPreferences.$inferInsert;
