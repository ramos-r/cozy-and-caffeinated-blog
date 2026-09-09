import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import { format } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { CoverImage } from "@/components/cover-image";
import { SiteFooter } from "@/components/site-footer";
import { mdxComponents } from "@/mdx-components";
import { parseDateOnly } from "@/lib/utils";
import type { Category } from "@/lib/categories";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { text: readingTimeText } = readingTime(post.content);

  return (
    <>
      <article className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {post.category} · {format(parseDateOnly(post.date), "MMM d, yyyy")} · {readingTimeText}
        </p>
        <h1 className="mt-4 font-serif text-3xl sm:text-4xl">{post.title}</h1>

        <div className="mt-8">
          <CoverImage
            src={post.coverUrl}
            alt={post.title}
            category={post.category as Category}
            className="h-56 w-full sm:h-72"
            priority
            sizes="(min-width: 1024px) 42rem, 100vw"
          />
        </div>

        <div className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
