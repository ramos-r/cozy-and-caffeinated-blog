import Link from "next/link";
import { format } from "date-fns";
import { CoverImage } from "./cover-image";
import { parseDateOnly } from "@/lib/utils";
import type { Post } from "@/lib/posts";
import type { Category } from "@/lib/categories";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg sm:flex-row"
    >
      <CoverImage
        src={post.coverUrl}
        alt={post.title}
        category={post.category as Category}
        className="h-48 w-full shrink-0 rounded-none sm:h-auto sm:w-56"
        sizes="(min-width: 640px) 14rem, 100vw"
      />
      <div className="flex flex-1 flex-col justify-center gap-2 p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {post.category} · {format(parseDateOnly(post.date), "MMM d, yyyy")}
        </p>
        <h2 className="font-serif text-xl transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        <p className="text-muted-foreground">{post.excerpt}</p>
      </div>
    </Link>
  );
}
