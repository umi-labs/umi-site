import React from 'react';
import { generateNestedStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadPage } from '@/sanity/loader/loadQuery';
import Page from '@/app/_components/pages/page/Page';
import { draftMode } from 'next/headers';
import PagePreview from '@/app/_components/pages/page/PagePreview';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: Array<string> };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: page } = await loadPage(
    params.slug.length > 1
      ? params.slug[params.slug.length - 1]
      : params.slug[0]
  );

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
  return (await generateNestedStaticSlugs('page'))
    .map((path) => {
      if (path.slug.children?.length === 0) {
        return {
          slug: [path.slug.parent],
        };
      } else {
        return path.slug.children?.map((child) => {
          return {
            slug: [path.slug.parent, child],
          };
        });
      }
    })
    .flat();
}

export default async function PageSlugRoute({
  params,
}: {
  params: { slug: string };
}) {
  const param = await params;

  if (!param) return null;

  const { slug } = param;

  const initial = await loadPage(
    slug.length > 1 ? slug[slug.length - 1] : slug[0]
  );

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={params!} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Page data={initial.data} />;
}
