import { notFound } from "next/navigation";
import { getGalleryItemById } from "@/lib/gallery";
import { GalleryForm } from "../../gallery-form";

export default async function EditGalleryItemPage({
  params,
}: PageProps<"/admin/gallery/[id]/edit">) {
  const { id } = await params;
  const item = await getGalleryItemById(Number(id));
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl">Edit photo</h1>
      <div className="mt-8">
        <GalleryForm item={item} />
      </div>
    </div>
  );
}
