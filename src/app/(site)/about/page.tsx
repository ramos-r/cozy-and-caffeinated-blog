import { CoverImage } from "@/components/cover-image";
import { Ornament } from "@/components/ornament";
import { SiteFooter } from "@/components/site-footer";

const LITTLE_THINGS = [
  "Creaky floors in secondhand bookshops.",
  "The first cold cup of coffee I always forget about and drink anyway.",
  "Rain that arrives while the kettle is still warm.",
  "A pencil worn down to a stub from actual use.",
  "The smell of a book nobody else has opened in years.",
  "Leaves that land exactly where you'd have placed them yourself.",
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Hello there</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">About me</h1>
        <p className="mt-4 font-serif italic text-lg text-muted-foreground">
          Bookworm, coffee drinker, collector of quiet afternoons.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-2 sm:items-start">
        <figure>
          <CoverImage
            src={null}
            alt="A portrait, still waiting to be added"
            category="Books"
            className="aspect-[4/5] w-full"
          />
          <figcaption className="mt-3 text-center font-serif italic text-sm text-muted-foreground">
            still, mostly, a work in progress
          </figcaption>
        </figure>
        <div className="flex flex-col justify-center gap-4 text-muted-foreground">
          <p>
            I&apos;m Rebecca — though most days I answer just as readily to &quot;have you
            finished that book yet&quot; and &quot;is there more coffee.&quot; I started this
            little corner of the internet because I kept having thoughts too small for anywhere
            else: a color the sky turned for four minutes, a line from a novel I couldn&apos;t
            stop thinking about, the exact way steam looks over a mug in October.
          </p>
          <p>
            Most of what I write about is ordinary on purpose — walks, weather, the books I
            return to, the coffee I make slightly wrong every morning. I&apos;ve never been in a
            hurry to get anywhere in particular, and this site is mostly an argument for why
            that&apos;s alright.
          </p>
          <p>
            If we met in person I&apos;d probably be somewhere with a book I&apos;ve read
            before, a drink going lukewarm beside me, entirely unbothered by either.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <Ornament />
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-2 sm:items-center">
        <div>
          <h2 className="font-serif text-2xl">Little things I love</h2>
          <ul className="mt-6 space-y-3">
            {LITTLE_THINGS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <CoverImage
          src={null}
          alt="A quiet corner, still waiting for a real photo"
          category="Autumn"
          className="aspect-[4/3] w-full"
        />
      </div>

      <SiteFooter />
    </>
  );
}
