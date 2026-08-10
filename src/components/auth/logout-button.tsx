"use client";

import { usePathname, useRouter } from "next/navigation";
import { USE_MOCK } from "@/lib/config";
import { ROUTES } from "@/lib/routes";

export function LogoutButton() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    localStorage.removeItem("token");

    try {
      await fetch("/api/auth/logout", { method: "DELETE" });
    } finally {
      router.replace(ROUTES.login);
      router.refresh();
    }
  }

  if (USE_MOCK || pathname === ROUTES.login) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] bg-main-red px-4 text-sm font-medium text-blanc transition-[background-color] hover:bg-dark-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
    >
      Se déconnecter
    </button>
  );
}
