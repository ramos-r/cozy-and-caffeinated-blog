import type { Metadata } from "next";
import { Ornament } from "@/components/ornament";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Cozy &amp; Caffeinated
          </p>
          <h1 className="mt-4 font-serif text-3xl">Welcome back</h1>
          <div className="mt-6">
            <Ornament />
          </div>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
