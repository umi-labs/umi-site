import React from 'react';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadProject } from '@/sanity/loader/loadQuery';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Project from '@/app/_components/pages/project/Project';
import ProjectPreview from '@/app/_components/pages/project/ProjectPreview';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: project } = await loadProject(params.slug);

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
  return await generateStaticSlugs('project');
}

export default async function PageSlugRoute({ params }) {
  const { slug } = params;

  const initial = await loadProject(slug);

  if ((await draftMode()).isEnabled) {
    return <ProjectPreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Project data={initial.data} />;
}
