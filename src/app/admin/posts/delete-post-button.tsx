"use client";

import { useRouter } from "next/navigation";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { deletePost } from "./actions";

export function DeletePostButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();

  return (
    <DeleteConfirmDialog
      itemLabel={`"${title}"`}
      onConfirm={async () => {
        await deletePost(id);
        router.refresh();
      }}
    />
  );
}
