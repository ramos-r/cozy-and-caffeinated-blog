import Link from "next/link";
import { signOut } from "@/auth";
import { siteConfig } from "@/config/site";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-8">
        <Link href="/admin" className="font-serif text-lg">
          {siteConfig.name} <span className="font-sans text-sm text-muted-foreground">admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">{children}</main>
    </div>
  );
}
