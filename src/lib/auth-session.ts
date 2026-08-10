import { cookies } from "next/headers";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  role: "client" | "owner" | "admin";
};

export function createMockSession(email: string, name = "Compte démo Kasa") {
  const user: SessionUser = {
    id: 1,
    name,
    email,
    picture: null,
    role: "admin",
  };
  const payload = Buffer.from(
    JSON.stringify({ id: user.id, role: user.role }),
  ).toString("base64url");

  return {
    token: `mock.${payload}.kasa`,
    user,
  };
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("kasa-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}
