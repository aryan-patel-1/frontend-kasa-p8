import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import {
  getWebsiteStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";
import "./globals.css";

// Rend la police disponible dans les classes Tailwind
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Kasa",
    template: "%s | Kasa",
  },
  description:
    "Trouvez un hébergement chaleureux et vivez des séjours uniques avec Kasa.",
  applicationName: "Kasa",
  keywords: [
    "location de vacances",
    "hébergement",
    "logement",
    "séjour",
    "Kasa",
  ],
  creator: "Kasa",
  publisher: "Kasa",
  category: "voyage",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Kasa",
    title: "Kasa",
    description:
      "Trouvez un hébergement chaleureux et vivez des séjours uniques avec Kasa.",
    images: [
      {
        url: "/img/accueil/hero-accueil.webp",
        alt: "Maison moderne proposée sur Kasa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasa",
    description:
      "Trouvez un hébergement chaleureux et vivez des séjours uniques avec Kasa.",
    images: ["/img/accueil/hero-accueil.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(getWebsiteStructuredData()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
