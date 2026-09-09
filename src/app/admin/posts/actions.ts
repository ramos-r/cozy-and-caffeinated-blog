"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/auth";
import { CATEGORIES } from "@/lib/categories";

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(CATEGORIES),
  date: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverUrl: z.string().nullable(),
  tags: z.array(z.string()),
  published: z.boolean(),
});

export type PostInput = z.infer<typeof postSchema>;

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createPost(input: PostInput) {
  await requireAuth();
  const data = postSchema.parse(input);

  await db.insert(posts).values(data);

  revalidatePath("/");
  revalidatePath(`/posts/${data.slug}`);
}

export async function updatePost(id: number, input: PostInput) {
  await requireAuth();
  const data = postSchema.parse(input);

  const [existing] = await db.select().from(posts).where(eq(posts.id, id));

  await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id));

  revalidatePath("/");
  if (existing && existing.slug !== data.slug) {
    revalidatePath(`/posts/${existing.slug}`);
  }
  revalidatePath(`/posts/${data.slug}`);
}

export async function deletePost(id: number) {
  await requireAuth();

  const [existing] = await db.select().from(posts).where(eq(posts.id, id));
  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/");
  if (existing) revalidatePath(`/posts/${existing.slug}`);
}
