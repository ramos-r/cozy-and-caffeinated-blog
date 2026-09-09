import { PostForm } from "../post-form";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl">New post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
