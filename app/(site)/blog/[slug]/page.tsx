import React from 'react';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadPage } from '@/sanity/loader/loadQuery';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import PagePreview from '@/app/_components/pages/page/PagePreview';
import Page from '@/app/_components/pages/page/Page';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: project } = await loadPage(params.slug);

  return {
    title: project?.metaData?.title
      ? project.metaData.title
      : project?.title
        ? project.title
        : 'UMI',
    description: project?.metaData?.description
      ? project?.metaData?.description
      : (await parent).description,
    keywords: project?.metaData?.keywords ? project?.metaData?.keywords : [],
  };
}

export async function generateStaticParams() {
  return await generateStaticSlugs('post');
}

export default async function PageSlugRoute({ params }) {
  const { slug } = params;

  const initial = await loadPage(slug);

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Page data={initial.data} />;
}
