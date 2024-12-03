import type { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { HomePage } from '@/app/_components/pages/home/HomePage';
import { studioUrl } from '@/sanity/lib/api';
import { loadHomePage } from '@/sanity/loader/loadQuery';

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

  let title = 'Home';

  if (page && page.metaData?.title) {
    title = page.metaData?.title;
  }

  return {
    title: title,
    description: page?.metaData?.description
      ? page?.metaData?.description
      : (await parent).description,
    keywords: page?.metaData?.keywords ? page?.metaData?.keywords : [],
  };
}

export default async function Home() {
  const initial = await loadHomePage();

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />;
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link
          href={`${studioUrl}/production/structure/pages;home`}
          className="underline"
        >
          create one now
        </Link>
        !
      </div>
    );
  }

  return <HomePage data={initial.data} />;
}
