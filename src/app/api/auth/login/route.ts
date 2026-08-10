import { NextResponse } from "next/server";
import {
  createMockSession,
  setSessionCookie,
  type SessionUser,
} from "@/lib/auth-session";
import { USE_MOCK } from "@/lib/config";

type LoginResponse = {
  token?: string;
  user?: SessionUser;
};

const API_URL = "http://localhost:3000";

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

  const email = credentials.email.trim().toLowerCase();

  if (USE_MOCK) {
    const result = createMockSession(email);
    await setSessionCookie(result.token);
    return NextResponse.json({ user: result.user });
  }

  try {
    // Transmet uniquement les identifiants attendus par le back
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
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
    await setSessionCookie(result.token);

    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json(
      { error: "Impossible de joindre le serveur Kasa" },
      { status: 503 },
    );
  }
}
