import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RegisterResponse = {
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    picture: string | null;
    role: "client" | "owner" | "admin";
  };
};

const API_URL = "http://localhost:3000";

export async function POST(request: Request) {
  let registration: {
    firstName?: unknown;
    lastName?: unknown;
    email?: unknown;
    password?: unknown;
  };

  try {
    registration = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Les informations envoyées sont invalides" },
      { status: 400 },
    );
  }

  if (
    typeof registration.firstName !== "string" ||
    typeof registration.lastName !== "string" ||
    typeof registration.email !== "string" ||
    typeof registration.password !== "string" ||
    !registration.firstName.trim() ||
    !registration.lastName.trim() ||
    !registration.email.trim() ||
    registration.password.length < 6
  ) {
    return NextResponse.json(
      {
        error:
          "Tous les champs sont obligatoires et le mot de passe doit contenir au moins 6 caractères",
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${registration.firstName.trim()} ${registration.lastName.trim()}`,
        email: registration.email.trim().toLowerCase(),
        password: registration.password,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const message =
        response.status === 409
          ? "Un compte existe déjà avec cette adresse email"
          : "L’inscription a échoué";

      return NextResponse.json({ error: message }, { status: response.status });
    }

    const result: RegisterResponse = await response.json();

    if (!result.token || !result.user) {
      return NextResponse.json(
        { error: "La réponse du serveur est invalide" },
        { status: 502 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("kasa-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Impossible de joindre le serveur Kasa" },
      { status: 503 },
    );
  }
}
