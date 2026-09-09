import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import type { Category } from "./categories";

export type Post = typeof posts.$inferSelect;

export async function getAllPosts(): Promise<Post[]> {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)));
  return post ?? null;
}

export async function getPostsByCategory(category: Category | "All"): Promise<Post[]> {
  if (category === "All") return getAllPosts();
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.published, true), eq(posts.category, category)))
    .orderBy(desc(posts.date));
}
