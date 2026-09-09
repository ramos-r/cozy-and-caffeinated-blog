"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DeleteConfirmDialogProps {
  itemLabel: string;
  onConfirm: () => void | Promise<void>;
  triggerClassName?: string;
}

export function DeleteConfirmDialog({
  itemLabel,
  onConfirm,
  triggerClassName,
}: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "text-destructive underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          triggerClassName,
        )}
      >
        Delete
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl border border-border bg-card p-6"
          >
            <h2 id="delete-dialog-title" className="font-serif text-xl">
              Delete {itemLabel}?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">This can&apos;t be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={async () => {
                  setIsPending(true);
                  await onConfirm();
                  setIsPending(false);
                  setOpen(false);
                }}
                className="rounded-lg bg-destructive px-4 py-2 text-sm text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isPending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
