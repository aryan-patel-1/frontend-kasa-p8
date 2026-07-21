import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Ajouter un logement",
};

// Conserve une version minimale pour les essais de mise en page
export default function AddPropertyPage() {
  return <PagePlaceholder title="Ajouter un logement" />;
}
