import { Header } from '@/app/_components/shared/Header';
import BasicHero from '@/app/_components/shared/heros/BasicHero';
import PrimaryHero from '@/app/_components/shared/heros/PrimaryHero';
import HeroWithMedia from '@/app/_components/shared/heros/heroWithMedia';
import HeroImageOverlap from '@/app/_components/shared/heros/heroImageOverlap';

export default function HeroSwitcher({
  data,
  title,
  overview,
}: {
  data: any;
  title?: string;
  overview: any;
}) {
  if (!data) {
    return <Header title={title} description={overview} />;
  }

  switch (data?._type) {
    case 'primaryHero':
      return <PrimaryHero title={data?.title} />;
    case 'basicHero':
      return <BasicHero heading={data?.heading} />;
    case 'heroWithMedia':
      return <HeroWithMedia data={data} />;
    case 'heroImageOverlap':
      return <HeroImageOverlap data={data} />;
    default:
      return <Header title={data?.title} description={data?.overview} />;
  }
}
