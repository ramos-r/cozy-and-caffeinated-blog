"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSiteSettings } from "./actions";
import type { SiteSettings } from "@/lib/settings";

const inputClasses =
  "w-full rounded-lg border border-input bg-card px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const labelClasses = "mb-1 block text-sm text-muted-foreground";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();

  const [readingTitle, setReadingTitle] = useState(settings.readingTitle);
  const [readingDetail, setReadingDetail] = useState(settings.readingDetail);
  const [drinkingDetail, setDrinkingDetail] = useState(settings.drinkingDetail);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setIsSubmitting(true);

    try {
      await updateSiteSettings({ readingTitle, readingDetail, drinkingDetail });
      setSaved(true);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5">
      <div>
        <label htmlFor="readingTitle" className={labelClasses}>
          Reading (title)
        </label>
        <input
          id="readingTitle"
          value={readingTitle}
          onChange={(e) => setReadingTitle(e.target.value)}
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="readingDetail" className={labelClasses}>
          Reading (detail)
        </label>
        <input
          id="readingDetail"
          value={readingDetail}
          onChange={(e) => setReadingDetail(e.target.value)}
          required
          placeholder="for the second time"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="drinkingDetail" className={labelClasses}>
          Drinking (detail)
        </label>
        <input
          id="drinkingDetail"
          value={drinkingDetail}
          onChange={(e) => setDrinkingDetail(e.target.value)}
          required
          placeholder="a cinnamon latte"
          className={inputClasses}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      {saved && !error && <p className="text-sm text-sage">Saved.</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
