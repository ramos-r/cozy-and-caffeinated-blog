"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { PostCard } from "./post-card";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

interface PostFeedProps {
  posts: Post[];
}

const FILTERS = ["All", ...CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

export function PostFeed({ posts }: PostFeedProps) {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active === filter
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No posts here yet — check back soon.
          </p>
        ) : (
          filtered.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
