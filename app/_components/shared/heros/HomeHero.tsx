export interface HomeHeroProps {
  title: string;
}

export default function HomeHero(props: HomeHeroProps) {
  const { title } = props;
  return (
    <section
      id="HomeHero"
      className="bg-cadet-gray flex h-screen w-screen flex-col items-center justify-between p-8 pt-20 md:pt-12"
    >
      <div />
      <div className="w-1/2">
        <h1 className="text-center text-6xl font-light leading-[1.25]">
          {title}
        </h1>
      </div>
    </section>
  );
}
