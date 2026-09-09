"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { auth } from "@/auth";
import { CATEGORIES } from "@/lib/categories";

const galleryItemSchema = z.object({
  caption: z.string().min(1),
  category: z.enum(CATEGORIES),
  imageUrl: z.string().nullable(),
  order: z.number().int(),
});

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createGalleryItem(input: GalleryItemInput) {
  await requireAuth();
  const data = galleryItemSchema.parse(input);

  await db.insert(galleryItems).values(data);

  revalidatePath("/gallery");
}

export async function updateGalleryItem(id: number, input: GalleryItemInput) {
  await requireAuth();
  const data = galleryItemSchema.parse(input);

  await db.update(galleryItems).set(data).where(eq(galleryItems.id, id));

  revalidatePath("/gallery");
}

export async function deleteGalleryItem(id: number) {
  await requireAuth();

  await db.delete(galleryItems).where(eq(galleryItems.id, id));

  revalidatePath("/gallery");
}
