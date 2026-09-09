import { Shell } from "@/components/shell";
import { getSiteSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <Shell
      readingTitle={settings.readingTitle}
      readingDetail={settings.readingDetail}
      drinkingDetail={settings.drinkingDetail}
    >
      {children}
    </Shell>
  );
}
