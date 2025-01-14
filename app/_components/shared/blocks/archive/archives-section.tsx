import React from 'react';
import { ProjectPayload } from '@/types';
import { cn } from '@/app/_utils';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import ArchivesFilterableBlock from '@/app/_components/shared/blocks/archive/archives-filterable-block';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getArchives } from '@/app/_actions/archive-queries';

interface Props {
  data: {
    separator?: boolean | undefined;
    title: string;
    description?: string | undefined;
    postType?: 'project' | 'post' | undefined;
    archive?: ProjectPayload[] | undefined;
  };
}

export default async function ArchivesSection({ data }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['archives'],
    queryFn: () =>
      getArchives({
        postType: data.postType!,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section
        className={cn(
          'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-0 overflow-visible py-10 md:gap-12 md:py-32 lg:gap-y-16'
        )}
      >
        <div className="flex-center flex-col gap-y-10 px-6 text-center">
          {data.separator && <EyebrowSVG className="" />}
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>

        <ArchivesFilterableBlock
          archives={data.archive}
          postType={data.postType}
        />
      </section>
    </HydrationBoundary>
  );
}
