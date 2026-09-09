"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSiteSettings } from "./actions";
import { SIDEBAR_ICONS, SIDEBAR_ICON_KEYS, type SidebarIconKey } from "@/lib/sidebar-icons";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/settings";

const inputClasses =
  "w-full rounded-lg border border-input bg-card px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const labelClasses = "mb-1 block text-sm text-muted-foreground";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();

  const [readingTitle, setReadingTitle] = useState(settings.readingTitle);
  const [readingDetail, setReadingDetail] = useState(settings.readingDetail);
  const [drinkingDetail, setDrinkingDetail] = useState(settings.drinkingDetail);
  const [avatarIcon, setAvatarIcon] = useState<SidebarIconKey | null>(
    settings.avatarIcon as SidebarIconKey | null,
  );
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>(settings.avatarImageUrl);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(settings.avatarImageUrl);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  function selectIcon(key: SidebarIconKey) {
    setAvatarIcon(key);
    setAvatarImageUrl(null);
    setAvatarImageFile(null);
    setAvatarPreview(null);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarImageFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarIcon(null);
  }

  function resetToDefault() {
    setAvatarIcon(null);
    setAvatarImageUrl(null);
    setAvatarImageFile(null);
    setAvatarPreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setIsSubmitting(true);

    try {
      let finalImageUrl = avatarImageUrl;

      if (avatarImageFile) {
        const formData = new FormData();
        formData.append("file", avatarImageFile);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error ?? "Upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
        finalImageUrl = json.url;
      }

      await updateSiteSettings({
        readingTitle,
        readingDetail,
        drinkingDetail,
        avatarIcon: finalImageUrl ? null : avatarIcon,
        avatarImageUrl: finalImageUrl,
      });
      setAvatarImageUrl(finalImageUrl);
      setAvatarImageFile(null);
      setSaved(true);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const AvatarPreviewIcon = avatarIcon ? SIDEBAR_ICONS[avatarIcon] : null;

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

      <div className="border-t border-border pt-5">
        <p className={labelClasses}>Sidebar icon</p>
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element -- transient local/remote preview, not a next/image-optimizable asset here
              <img src={avatarPreview} alt="" className="h-full w-full object-cover" />
            ) : AvatarPreviewIcon ? (
              <AvatarPreviewIcon className="h-5 w-5" />
            ) : (
              <span className="font-serif text-lg">C</span>
            )}
          </span>
          <button
            type="button"
            onClick={resetToDefault}
            className="text-sm text-muted-foreground underline-offset-2 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Use default
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {SIDEBAR_ICON_KEYS.map((key) => {
            const Icon = SIDEBAR_ICONS[key];
            const active = avatarIcon === key && !avatarPreview;
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectIcon(key)}
                aria-pressed={active}
                aria-label={key}
                className={cn(
                  "flex items-center justify-center rounded-lg border border-input p-2.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active ? "border-accent bg-secondary text-accent" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label htmlFor="avatarImage" className={labelClasses}>
            Or upload a photo
          </label>
          <input
            id="avatarImage"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageChange}
            className="block w-full text-sm text-muted-foreground"
          />
        </div>
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
