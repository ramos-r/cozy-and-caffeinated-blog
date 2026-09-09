import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export interface SiteSettings {
  readingTitle: string;
  readingDetail: string;
  drinkingDetail: string;
  avatarIcon: string | null;
  avatarImageUrl: string | null;
}

const FALLBACK_SETTINGS: SiteSettings = {
  readingTitle: "Piranesi",
  readingDetail: "for the second time",
  drinkingDetail: "a cinnamon latte",
  avatarIcon: null,
  avatarImageUrl: null,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  if (!row) return FALLBACK_SETTINGS;
  return {
    readingTitle: row.readingTitle,
    readingDetail: row.readingDetail,
    drinkingDetail: row.drinkingDetail,
    avatarIcon: row.avatarIcon,
    avatarImageUrl: row.avatarImageUrl,
  };
}
