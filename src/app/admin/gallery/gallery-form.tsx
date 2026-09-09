"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, type Category } from "@/lib/categories";
import { createGalleryItem, updateGalleryItem } from "./actions";
import type { GalleryItem } from "@/lib/gallery";

interface GalleryFormProps {
  item?: GalleryItem;
}

const inputClasses =
  "w-full rounded-lg border border-input bg-card px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const labelClasses = "mb-1 block text-sm text-muted-foreground";

export function GalleryForm({ item }: GalleryFormProps) {
  const router = useRouter();
  const isEditing = !!item;

  const [caption, setCaption] = useState(item?.caption ?? "");
  const [category, setCategory] = useState<Category>(
    (item?.category as Category) ?? CATEGORIES[0],
  );
  const [order, setOrder] = useState(item?.order ?? 0);
  const imageUrl = item?.imageUrl ?? null;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(item?.imageUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error ?? "Upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
        finalImageUrl = json.url;
      }

      const payload = { caption, category, imageUrl: finalImageUrl, order };

      if (isEditing) {
        await updateGalleryItem(item.id, payload);
      } else {
        await createGalleryItem(payload);
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5">
      <div>
        <label htmlFor="caption" className={labelClasses}>
          Caption
        </label>
        <input
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          className={inputClasses}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClasses}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={inputClasses}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="order" className={labelClasses}>
            Order
          </label>
          <input
            id="order"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="image" className={labelClasses}>
          Photo
        </label>
        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageChange}
          className="block w-full text-sm text-muted-foreground"
        />
        {imagePreview && (
          // eslint-disable-next-line @next/next/no-img-element -- transient local/remote preview, not a next/image-optimizable asset here
          <img
            src={imagePreview}
            alt="Photo preview"
            className="mt-3 aspect-square w-40 rounded-lg object-cover"
          />
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Add photo"}
      </button>
    </form>
  );
}
