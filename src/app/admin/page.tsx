import { auth, signOut } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-foreground">
      <h1 className="font-serif text-3xl">Admin</h1>
      <p className="text-muted-foreground">Signed in as {session?.user?.email}</p>
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        The real dashboard (posts, gallery, Right Now) lands in the next phase — for now, this
        page just confirms the auth flow works.
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button
          type="submit"
          className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
