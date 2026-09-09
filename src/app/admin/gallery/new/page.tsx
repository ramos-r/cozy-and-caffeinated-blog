import { GalleryForm } from "../gallery-form";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl">Add photo</h1>
      <div className="mt-8">
        <GalleryForm />
      </div>
    </div>
  );
}
