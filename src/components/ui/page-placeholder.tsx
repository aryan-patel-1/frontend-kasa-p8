type PagePlaceholderProps = Readonly<{
  title: string;
  eyebrow?: string;
  description?: string;
}>;

// Maintient une présentation cohérente pour les écrans encore incomplets
export function PagePlaceholder({
  title,
  eyebrow,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1115px] flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium text-dark-orange">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-bold text-main-red sm:text-[32px]">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-xl text-sm leading-[1.426] text-gris-dark">
          {description}
        </p>
      ) : null}
    </section>
  );
}
