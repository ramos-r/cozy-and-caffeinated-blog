import { getSiteSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-serif text-2xl">Right now</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Shown in the sidebar on every public page.
      </p>
      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
