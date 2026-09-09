import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";

export type GalleryItem = typeof galleryItems.$inferSelect;

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return db.select().from(galleryItems).orderBy(asc(galleryItems.order));
}

// Admin-only: looked up by id (for the edit form).
export async function getGalleryItemById(id: number): Promise<GalleryItem | null> {
  const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
  return item ?? null;
}
