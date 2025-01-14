import type { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

import { HomePage } from '@/app/_components/pages/home/HomePage';
import { loadHomePage } from '@/sanity/loader/loadQuery';
import { notFound } from 'next/navigation';

const HomePagePreview = dynamic(
  () => import('@/app/_components/pages/home/HomePagePreview')
);

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: page } = await loadHomePage();

  return {
    title: page?.metaData.title || 'Home',
    description: page?.metaData?.description,
    keywords: page?.metaData?.keywords ? page?.metaData?.keywords : [],
  };
}

export default async function Home() {
  const initial = await loadHomePage();

  if ((await draftMode()).isEnabled) {
    return <HomePagePreview initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <HomePage data={initial.data} />;
}
