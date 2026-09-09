"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { auth } from "@/auth";
import { isSidebarIconKey } from "@/lib/sidebar-icons";

const settingsSchema = z.object({
  readingTitle: z.string().min(1),
  readingDetail: z.string().min(1),
  drinkingDetail: z.string().min(1),
  avatarIcon: z
    .string()
    .nullable()
    .refine((v) => v === null || isSidebarIconKey(v), "Unknown icon"),
  avatarImageUrl: z.string().url().nullable(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export async function updateSiteSettings(input: SettingsInput) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const data = settingsSchema.parse(input);

  await db
    .insert(siteSettings)
    .values({ id: 1, ...data })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: { ...data, updatedAt: new Date() },
    });

  revalidatePath("/", "layout");
}
