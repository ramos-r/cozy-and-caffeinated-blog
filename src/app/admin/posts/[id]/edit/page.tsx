import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
import { PostForm } from "../../post-form";

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]/edit">) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl">Edit post</h1>
      <div className="mt-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
