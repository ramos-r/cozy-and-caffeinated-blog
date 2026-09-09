import Link from "next/link";
import { format } from "date-fns";
import { getAllPostsForAdmin } from "@/lib/posts";
import { getGalleryItems } from "@/lib/gallery";
import { getSiteSettings } from "@/lib/settings";
import { CoverImage } from "@/components/cover-image";
import { cn, parseDateOnly } from "@/lib/utils";
import { DeletePostButton } from "./posts/delete-post-button";
import { DeleteGalleryButton } from "./gallery/delete-gallery-button";
import type { Category } from "@/lib/categories";

const buttonPrimary =
  "rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default async function AdminDashboardPage() {
  const [postsList, galleryList, settings] = await Promise.all([
    getAllPostsForAdmin(),
    getGalleryItems(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col gap-14">
      <section>
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-serif text-2xl">Posts</h1>
          <Link href="/admin/posts/new" className={buttonPrimary}>
            New post
          </Link>
        </div>

        {postsList.length === 0 ? (
          <p className="mt-8 rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            No posts yet — create your first one.
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="hidden w-full md:table">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {postsList.map((post) => (
                  <tr key={post.id} className="border-t border-border">
                    <td className="px-4 py-3 font-serif">{post.title}</td>
                    <td className="px-4 py-3 text-sm">{post.category}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {format(parseDateOnly(post.date), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          post.published
                            ? "bg-sage text-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        Edit
                      </Link>
                      {" · "}
                      <DeletePostButton id={post.id} title={post.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="divide-y divide-border md:hidden">
              {postsList.map((post) => (
                <li key={post.id} className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-serif">{post.title}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs",
                        post.published
                          ? "bg-sage text-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.category} · {format(parseDateOnly(post.date), "MMM d, yyyy")}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeletePostButton id={post.id} title={post.title} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl">Gallery</h2>
          <Link href="/admin/gallery/new" className={buttonPrimary}>
            Add photo
          </Link>
        </div>

        {galleryList.length === 0 ? (
          <p className="mt-8 rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            No gallery photos yet — add your first one.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border rounded-lg border border-border">
            {galleryList.map((item) => (
              <li key={item.id} className="flex items-center gap-4 p-4">
                <CoverImage
                  src={item.imageUrl}
                  alt={item.caption}
                  category={item.category as Category}
                  className="h-14 w-14 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-serif italic">{item.caption}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex shrink-0 gap-4 text-sm">
                  <Link
                    href={`/admin/gallery/${item.id}/edit`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteGalleryButton id={item.id} caption={item.caption} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl">Right now</h2>
          <Link href="/admin/settings" className={buttonPrimary}>
            Edit
          </Link>
        </div>
        <div className="mt-6 rounded-lg border border-border bg-card p-4 text-sm">
          <p>
            Reading <em className="font-serif italic">{settings.readingTitle}</em>,{" "}
            {settings.readingDetail}.
          </p>
          <p className="mt-1">Sipping {settings.drinkingDetail}.</p>
        </div>
      </section>
    </div>
  );
}
