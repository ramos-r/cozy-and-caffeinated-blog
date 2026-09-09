import Link from "next/link";
import { Ornament } from "@/components/ornament";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Nothing here</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Page not found</h1>
        <p className="mt-4 font-serif italic text-lg text-muted-foreground">
          This page must have wandered off somewhere quieter.
        </p>
        <div className="mt-8">
          <Ornament />
        </div>
        <Link
          href="/"
          className="mt-10 inline-block text-accent underline underline-offset-2 hover:no-underline"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
