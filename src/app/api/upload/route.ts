import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Client-side direct upload: the browser uploads straight to Blob storage
// using a token issued here, instead of routing the file body through this
// Serverless Function — Vercel's platform caps a function's request body at
// ~4.5MB, which real (uncompressed phone/camera) photos routinely exceed.
const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  // Only the token-generation step is a browser request with our session
  // cookie — the upload-completed callback is a server-to-server call from
  // Vercel Blob's infrastructure once the direct upload finishes.
  if (body.type === "blob.generate-client-token") {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: MAX_SIZE,
        addRandomSuffix: true,
      }),
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed. Please try again." },
      { status: 400 },
    );
  }
}
