import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "À propos",
};

export default function AboutPage() {
  return <PagePlaceholder title="À propos" />;
}
