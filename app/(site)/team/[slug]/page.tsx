import React from 'react';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadTeam } from '@/sanity/loader/loadQuery';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Team from '@/app/_components/pages/team/Team';
import TeamPreview from '@/app/_components/pages/team/TeamPreview';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: project } = await loadTeam(params.slug);

  return {
    title: project?.metaData?.title
      ? project.metaData.title
      : project?.name
        ? project.name
        : 'UMI',
    description: project?.metaData?.description
      ? project?.metaData?.description
      : (await parent).description,
    keywords: project?.metaData?.keywords ? project?.metaData?.keywords : [],
  };
}

export async function generateStaticParams() {
  return await generateStaticSlugs('team');
}

export default async function PageSlugRoute({ params }) {
  const { slug } = params;

  const initial = await loadTeam(slug);

  if ((await draftMode()).isEnabled) {
    return <TeamPreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Team data={initial.data} />;
}
