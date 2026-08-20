import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { USE_MOCK } from "@/lib/config";

const SKIP_AUTH_FOR_W3C = true;

export function proxy(request: NextRequest) {
  // Ouvre temporairement les pages privées pour les contrôles W3C
  if (USE_MOCK || SKIP_AUTH_FOR_W3C) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.has("kasa-token");

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-property", "/favorites", "/messages/:path*"],
};
