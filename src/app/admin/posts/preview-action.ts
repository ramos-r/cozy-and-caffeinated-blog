"use server";

import { serialize } from "next-mdx-remote/serialize";

export async function serializeMarkdown(markdown: string) {
  try {
    return await serialize(markdown);
  } catch {
    return null;
  }
}
