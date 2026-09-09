import { getAllPosts } from "@/lib/posts";
import { Ornament } from "@/components/ornament";
import { PostFeed } from "@/components/post-feed";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Welcome to my little corner
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Cozy &amp; Caffeinated</h1>
        <p className="mt-4 font-serif italic text-lg text-muted-foreground">
          Books, coffee and the softest season of the year — written slowly, on purpose.
        </p>
        <div className="mt-8">
          <Ornament />
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-4xl">
        <PostFeed posts={posts} />
      </div>

      <SiteFooter />
    </>
  );
}
