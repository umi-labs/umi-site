import React from 'react';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadPage } from '@/sanity/loader/loadQuery';
import Page from '@/app/_components/pages/page/Page';
import { draftMode } from 'next/headers';
import PagePreview from '@/app/_components/pages/page/PagePreview';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: page } = await loadPage('team');

  return {
    title: page?.metaData?.title
      ? page.metaData.title
      : page?.title
        ? page.title
        : 'UMI',
    description: page?.metaData?.description
      ? page?.metaData?.description
      : (await parent).description,
    keywords: page?.metaData?.keywords ? page?.metaData?.keywords : [],
  };
}

export async function generateStaticParams() {
  return await generateStaticSlugs('team');
}

export default async function PageSlugRoute({ params }) {
  const { slug } = params;
  const initial = await loadPage('team');

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Page data={initial.data} />;
}
