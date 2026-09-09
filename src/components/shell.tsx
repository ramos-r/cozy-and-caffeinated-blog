"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Coffee, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SIDEBAR_ICONS, type SidebarIconKey } from "@/lib/sidebar-icons";
import { ThemeToggle } from "@/components/theme-toggle";

interface ShellProps {
  readingTitle: string;
  readingDetail: string;
  drinkingDetail: string;
  avatarIcon: string | null;
  avatarImageUrl: string | null;
  children: React.ReactNode;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Shell({
  readingTitle,
  readingDetail,
  drinkingDetail,
  avatarIcon,
  avatarImageUrl,
  children,
}: ShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const AvatarIcon = avatarIcon ? SIDEBAR_ICONS[avatarIcon as SidebarIconKey] : null;

  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <div className="md:flex md:min-h-screen">
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 md:hidden">
        <span className="font-serif text-lg">{siteConfig.name}</span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
            className={cn("rounded-md p-2 text-foreground hover:bg-secondary", focusRing)}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-30 bg-foreground/30 md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto border-r border-border bg-secondary p-6 transition-transform duration-200",
          "md:sticky md:top-0 md:h-screen md:translate-x-0",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-serif text-lg text-primary-foreground">
            {avatarImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- small avatar, not worth next/image's overhead here
              <img src={avatarImageUrl} alt="" className="h-full w-full object-cover" />
            ) : AvatarIcon ? (
              <AvatarIcon className="h-5 w-5" />
            ) : (
              "C"
            )}
          </span>
          <div>
            <p className="font-serif text-lg leading-tight">{siteConfig.name}</p>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-background",
                  focusRing,
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-lg border border-border bg-card p-4 text-sm text-card-foreground">
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Right now
          </p>
          <p className="mb-2 flex items-start gap-2">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              Reading <em className="font-serif italic">{readingTitle}</em>, {readingDetail}.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <Coffee className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>Sipping {drinkingDetail}.</span>
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-8">
          <div className="flex gap-2">
            {siteConfig.social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    "rounded-md p-2 text-muted-foreground hover:bg-background hover:text-accent",
                    focusRing,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex w-full flex-1 flex-col pt-16 md:pt-0">
        <div className="hidden items-center justify-center gap-2 border-b border-border py-3 md:flex">
          <Coffee className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          <span className="font-serif italic text-sm text-muted-foreground">
            {siteConfig.topBarNote}
          </span>
        </div>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
