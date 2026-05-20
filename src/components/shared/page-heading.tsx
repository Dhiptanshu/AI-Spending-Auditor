type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <div className="flex max-w-3xl flex-col gap-2">
      {eyebrow ? (
        <p className="text-muted-foreground text-sm font-medium">{eyebrow}</p>
      ) : null}
      <h1 className="text-foreground text-3xl font-semibold tracking-normal sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground text-base leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
