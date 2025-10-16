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
    <>
      {/* Aurora Dream Vivid Bloom Gradient Background */}
      <div className="fixed top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 70% 20%, rgba(54, 141, 177, 0.85), transparent 68%),
              radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 228, 140, 0.75), transparent 68%),
              radial-gradient(ellipse 60% 50% at 60% 65%, rgba(176, 222, 230, 0.98), transparent 68%),
              radial-gradient(ellipse 65% 40% at 50% 60%, rgba(236, 205, 127, 0.3), transparent 68%),
              linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)
            `,
          }}
        />
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section
          id="MeetTheTeam"
          className={cn(
            'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-0 overflow-visible py-32 md:gap-12 md:py-64 lg:gap-y-16'
          )}
        >
          <div className="flex-center flex-col gap-y-10 px-6 text-center">
            {data.separator && <EyebrowSVG className="" />}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent">
              {data.title}
            </h1>
            <p className="text-xl text-[#313E4E]/80 max-w-3xl leading-relaxed">{data.description}</p>
          </div>

          <div className="w-full">
            <MeetTheTeamFilterableBlock />
          </div>
        </section>
      </HydrationBoundary>
    </>
  );
}
