type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-1">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {description ? (
        <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
