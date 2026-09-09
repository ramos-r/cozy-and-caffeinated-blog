"use client";

import { useRouter } from "next/navigation";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { deleteGalleryItem } from "./actions";

export function DeleteGalleryButton({ id, caption }: { id: number; caption: string }) {
  const router = useRouter();

  return (
    <DeleteConfirmDialog
      itemLabel={`"${caption}"`}
      onConfirm={async () => {
        await deleteGalleryItem(id);
        router.refresh();
      }}
    />
  );
}
