export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-foreground">
      <h1 className="font-serif text-4xl">Cozy &amp; Caffeinated</h1>
      <p className="font-sans text-base text-muted-foreground">
        Design tokens are wired up — pages come next.
      </p>
      <button className="rounded-lg bg-primary px-4 py-2 font-sans text-primary-foreground">
        Sample button
      </button>
    </main>
  );
}
