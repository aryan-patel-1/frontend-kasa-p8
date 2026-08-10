import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { USE_MOCK } from "@/lib/config";

export function proxy(request: NextRequest) {
  // Les pages de démonstration restent ouvertes quand le backend est désactivé
  if (USE_MOCK) {
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
