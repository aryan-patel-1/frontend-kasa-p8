import { PagePlaceholder } from "@/components/ui/page-placeholder";

export default async function PropertyPage(
  props: PageProps<"/properties/[id]">,
) {
  const { id } = await props.params;

  return (
    <PagePlaceholder
      eyebrow={`Logement ${id}`}
      title="Détail du logement"
    />
  );
}
