import { siteConfig } from "@/config/site";
import { Ornament } from "./ornament";

export function SiteFooter() {
  return (
    <footer className="mt-16 py-10 text-center">
      <Ornament />
      <p className="mt-4 font-serif italic text-muted-foreground">{siteConfig.footer.quote}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
        {siteConfig.footer.note}
      </p>
    </footer>
  );
}
