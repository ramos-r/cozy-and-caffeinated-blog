import { asc } from "drizzle-orm";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";

export type GalleryItem = typeof galleryItems.$inferSelect;

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return db.select().from(galleryItems).orderBy(asc(galleryItems.order));
}
