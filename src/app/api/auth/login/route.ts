import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";

type LoginResponse = {
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    picture: string | null;
    role: "client" | "owner" | "admin";
  };
};

export async function POST(request: Request) {
  let credentials: { email?: unknown; password?: unknown };

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Les informations envoyées sont invalides" },
      { status: 400 },
    );
  }

  if (
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    !credentials.email.trim() ||
    !credentials.password
  ) {
    return NextResponse.json(
      { error: "L’adresse email et le mot de passe sont obligatoires" },
      { status: 400 },
    );
  }

  try {
    // Transmet uniquement les identifiants attendus par le back
    const response = await fetch(getApiUrl("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const message =
        response.status === 401
          ? "Adresse email ou mot de passe incorrect"
          : "La connexion a échoué";

      return NextResponse.json({ error: message }, { status: response.status });
    }

    const result: LoginResponse = await response.json();

    if (!result.token || !result.user) {
      return NextResponse.json(
        { error: "La réponse du serveur est invalide" },
        { status: 502 },
      );
    }

    // Le cookie protège le jeton des scripts exécutés dans la page
    const responseWithSession = NextResponse.json({ user: result.user });
    responseWithSession.cookies.set("kasa-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return responseWithSession;
  } catch {
    return NextResponse.json(
      { error: "Impossible de joindre le serveur Kasa" },
      { status: 503 },
    );
  }
}
