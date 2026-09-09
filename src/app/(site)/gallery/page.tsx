import { getGalleryItems } from "@/lib/gallery";
import { CoverImage } from "@/components/cover-image";
import { Ornament } from "@/components/ornament";
import { SiteFooter } from "@/components/site-footer";
import type { Category } from "@/lib/categories";

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Collected</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Gallery</h1>
        <p className="mt-4 font-serif italic text-lg text-muted-foreground">
          Photographs from the softest months of the year.
        </p>
        <div className="mt-8">
          <Ornament />
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.id}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <CoverImage
              src={item.imageUrl}
              alt={item.caption}
              category={item.category as Category}
              className="aspect-square w-full rounded-none"
            />
            <figcaption className="px-3 py-2 text-center font-serif italic text-sm text-muted-foreground">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <SiteFooter />
    </>
  );
}
