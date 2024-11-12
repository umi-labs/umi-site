export interface BasicHeroProps {
  heading: string;
}

export default function BasicHero(props: BasicHeroProps) {
  const { heading } = props;
  return (
    <section
      id="BasicHero"
      className="flex min-h-[60svh] w-full flex-col items-end justify-end gap-y-12 py-20"
    >
      <div className="flex w-full flex-col items-start justify-end gap-y-4 px-8 lg:w-fit">
        <h1 className="text-6xl font-bold leading-none md:text-8xl lg:text-[10rem]">
          {heading}
        </h1>
      </div>
    </section>
  );
}
