"use client";

import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import type { serialize } from "next-mdx-remote/serialize";
import { mdxComponents } from "@/mdx-components";
import { serializeMarkdown } from "./preview-action";

type SerializedResult = Awaited<ReturnType<typeof serialize>>;

export function MarkdownPreview({ markdown }: { markdown: string }) {
  const [result, setResult] = useState<SerializedResult | null>(null);

  useEffect(() => {
    if (!markdown.trim()) return;
    const handle = setTimeout(() => {
      serializeMarkdown(markdown).then(setResult);
    }, 400);
    return () => clearTimeout(handle);
  }, [markdown]);

  if (!markdown.trim()) {
    return <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>;
  }

  if (!result) {
    return <p className="text-sm text-muted-foreground">Rendering preview…</p>;
  }

  return (
    <div>
      <MDXRemote {...result} components={mdxComponents} />
    </div>
  );
}
