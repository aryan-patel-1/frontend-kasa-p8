import { PagePlaceholder } from "@/components/ui/page-placeholder";

export default function NotFoundPage() {
  return (
    <PagePlaceholder
      eyebrow="404"
      title="Cette page semble être partie en vacances"
      description="La page demandée n’existe pas ou a été déplacée."
    />
  );
}
