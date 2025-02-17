import { Header } from '@/app/_components/shared/Header';
import BasicHero from '@/app/_components/shared/heros/BasicHero';
import PrimaryHero from '@/app/_components/shared/heros/PrimaryHero';
import HeroWithMedia from '@/app/_components/shared/heros/heroWithMedia';
import HeroImageOverlap from '@/app/_components/shared/heros/heroImageOverlap';
import ArchivesSection from '@/app/_components/shared/blocks/archive/archives-section';
import MeetTheTeamSection from '@/app/_components/shared/blocks/meet-the-team/meet-the-team-section';

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
      return <BasicHero data={data} />;
    case 'heroWithMedia':
      return <HeroWithMedia data={data} />;
    case 'heroImageOverlap':
      return <HeroImageOverlap data={data} />;
    case 'archiveBlock':
      return <ArchivesSection data={data} />;
    case 'meetTheTeam':
      return <MeetTheTeamSection data={data} />;
    default:
      return <Header title={data?.title} description={data?.overview} />;
  }
}
