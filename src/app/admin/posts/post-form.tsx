"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { CATEGORIES, type Category } from "@/lib/categories";
import { cn, slugify } from "@/lib/utils";
import { MarkdownPreview } from "./markdown-preview";
import { createPost, updatePost } from "./actions";
import type { Post } from "@/lib/posts";

interface PostFormProps {
  post?: Post;
}

const inputClasses =
  "w-full rounded-lg border border-input bg-card px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const labelClasses = "mb-1 block text-sm text-muted-foreground";

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  // null = "follow the title automatically"; a string once the user edits the field directly.
  const [manualSlug, setManualSlug] = useState<string | null>(post?.slug ?? null);
  const slug = manualSlug ?? slugify(title);
  const [category, setCategory] = useState<Category>(
    (post?.category as Category) ?? CATEGORIES[0],
  );
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().slice(0, 10));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [published, setPublished] = useState(post?.published ?? true);
  const coverUrl = post?.coverUrl ?? null;
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(post?.coverUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let finalCoverUrl = coverUrl;

      if (coverFile) {
        try {
          const blob = await upload(coverFile.name, coverFile, {
            access: "public",
            handleUploadUrl: "/api/upload",
          });
          finalCoverUrl = blob.url;
        } catch {
          setError("Upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        title,
        slug,
        category,
        date,
        excerpt,
        content,
        coverUrl: finalCoverUrl,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published,
      };

      if (isEditing) {
        await updatePost(post.id, payload);
      } else {
        await createPost(payload);
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="title" className={labelClasses}>
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClasses}>
            Slug
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setManualSlug(e.target.value)}
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
            <label htmlFor="date" className={labelClasses}>
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputClasses}
            />
          </div>
        </div>
        <div>
          <label htmlFor="excerpt" className={labelClasses}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={3}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="tags" className={labelClasses}>
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="cover" className={labelClasses}>
            Cover photo
          </label>
          <input
            id="cover"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleCoverChange}
            className="block w-full text-sm text-muted-foreground"
          />
          {coverPreview && (
            // eslint-disable-next-line @next/next/no-img-element -- transient local/remote preview, not a next/image-optimizable asset here
            <img
              src={coverPreview}
              alt="Cover preview"
              className="mt-3 h-32 w-full rounded-lg object-cover"
            />
          )}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          Published
        </label>

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
          {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Create post"}
        </button>
      </div>

      <div>
        <label htmlFor="content" className={labelClasses}>
          Body (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={16}
          className={cn(inputClasses, "font-mono text-sm")}
        />
        <div className="mt-6">
          <p className={labelClasses}>Live preview</p>
          <div className="rounded-lg border border-border bg-card p-4">
            <MarkdownPreview markdown={content} />
          </div>
        </div>
      </div>
    </form>
  );
}
