import React from 'react';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadService } from '@/sanity/loader/loadQuery';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import PagePreview from '@/app/_components/pages/page/PagePreview';
import Page from '@/app/_components/pages/page/Page';
import Script from 'next/script';
import { Service, WithContext } from 'schema-dts';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: project } = await loadService(params.slug);

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
  return await generateStaticSlugs('service');
}

export default async function PageSlugRoute({ params }) {
  const { slug } = params;

  const initial = await loadService(slug);

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: initial.data.title,
    description: initial.data.metaData?.description,
    serviceType: initial.data.title,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Umi Digital',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'United Kingdom',
    },
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Page data={initial.data} />
    </>
  );
}
