export interface PrimaryHeroProps {
  title: string;
}

export default function PrimaryHero(props: PrimaryHeroProps) {
  const { title } = props;
  return (
    <section
      id="PrimaryHero"
      className="flex min-h-[60svh] w-full flex-col items-end justify-end gap-y-12 py-20"
    >
      <div className="flex w-full flex-col items-start justify-end gap-y-4 px-8 lg:w-fit lg:items-start lg:justify-start">
        <h1 className="text-center uppercase">{title}</h1>
      </div>
    </section>
  );
}
