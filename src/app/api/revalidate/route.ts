import { revalidatePath } from "next/cache";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token === process.env.REVALIDATE_TOKEN) {
    revalidatePath("/");
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({ revalidated: false, now: Date.now(), message: "Stop 👉🏻👈🏻" });
}
