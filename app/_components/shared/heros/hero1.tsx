import { cn } from '@/lib/utils';

interface Hero_1Props {
  data: {
    tagline: string;
    heading: string;
    descritpion: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  textAlignHoz?: ('left' | 'center' | 'right') | undefined;
  textAlignVer?: ('top' | 'center' | 'bottom') | undefined;
  variant?: ('primary' | 'secondary' | 'tertiary') | undefined;
}

export default function Hero1({
  data,
  textAlignHoz = 'center',
  textAlignVer,
}: Hero_1Props) {
  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute left-0 top-0 z-0 h-screen w-full">
        <div className="absolute left-0 top-0 z-0 h-screen w-full bg-gradient-to-b from-black/50 to-black" />
        <picture className="">
          <source srcSet={data.image.src} />
          <img
            src={data.image.src}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
            className="h-screen w-full object-cover object-center"
          />
        </picture>
      </div>
      <div
        className={cn(
          'z-10 mx-auto max-w-[768px] gap-4 text-white',
          `text-${textAlignHoz}`,
          textAlignVer
        )}
      >
        <span className="text-base font-semibold">{data.tagline}</span>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-6xl font-bold">{data.heading}</h1>
          <p className="text-lg">{data.descritpion}</p>
        </div>
      </div>
    </section>
  );
}
