import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  excerpt: text("excerpt").notNull(),
  category: varchar("category", { length: 20 }).notNull(), // Coffee | Books | Autumn | Thoughts | Art
  content: text("content").notNull(), // markdown body
  coverUrl: text("cover_url"), // Vercel Blob URL, nullable
  tags: text("tags").array(),
  published: boolean("published").notNull().default(true),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  caption: varchar("caption", { length: 200 }).notNull(),
  category: varchar("category", { length: 20 }).notNull(),
  imageUrl: text("image_url"), // Vercel Blob URL, nullable
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1), // always exactly one row
  readingTitle: varchar("reading_title", { length: 200 }).notNull(),
  readingDetail: varchar("reading_detail", { length: 200 }).notNull(),
  drinkingDetail: varchar("drinking_detail", { length: 200 }).notNull(),
  avatarIcon: varchar("avatar_icon", { length: 30 }), // key into SIDEBAR_ICONS, nullable
  avatarImageUrl: text("avatar_image_url"), // Vercel Blob URL, nullable — takes precedence over avatarIcon
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
