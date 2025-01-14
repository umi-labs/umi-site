import React from 'react';
import { cn } from '@/app/_utils';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTeam } from '@/app/_actions/team';
import MeetTheTeamFilterableBlock from '@/app/_components/shared/blocks/meet-the-team/meet-the-team-filterable-block';

interface Props {
  data: {
    separator?: boolean | undefined;
    title: string;
    description?: string | undefined;
  };
}

export default async function MeetTheTeamSection({ data }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['team'],
    queryFn: () => getTeam(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section
        id="MeetTheTeam"
        className={cn(
          'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-0 overflow-visible py-10 md:gap-12 md:py-32 lg:gap-y-16'
        )}
      >
        <div className="flex-center flex-col gap-y-10 px-6 text-center">
          {data.separator && <EyebrowSVG className="" />}
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>

        <MeetTheTeamFilterableBlock />
      </section>
    </HydrationBoundary>
  );
}
