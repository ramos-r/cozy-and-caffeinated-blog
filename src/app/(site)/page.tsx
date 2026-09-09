import { Ornament } from "@/components/ornament";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
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
        <p className="mt-10 text-muted-foreground">
          The post feed and category filters land in the next phase — for now, this page just
          confirms the shell renders correctly.
        </p>
      </div>
      <SiteFooter />
    </>
  );
}
