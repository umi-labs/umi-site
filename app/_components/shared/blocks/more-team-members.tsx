'use client';
import React from 'react';
import Link from '@/app/_components/ui/link';
import {
  Slider,
  SliderContent,
  SliderIndicators,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from '@/app/_components/ui/slider';
import { getRelatedTeamMembers } from '@/app/_actions/team';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';
import { cn } from '@/app/_utils';

interface Props {
  currentMember: string;
}

export default function MoreTeamMembers({ currentMember }: Props) {
  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: () => getRelatedTeamMembers({ slug: currentMember }),
    placeholderData: keepPreviousData,
    enabled: !!currentMember,
  });

  return (
    <section
      className={cn(
        'relative mx-auto my-20 flex min-h-full w-full max-w-7xl flex-col bg-[#FAFAFA] px-12 py-10 md:py-24 lg:gap-y-16'
      )}
    >
      <TopBuffer visible={true} colour="grey" />
      <div className="flex w-full items-center justify-between gap-6">
        <h2 className="text-5xl font-semibold italic">More Team Members</h2>
        <Link
          variant="secondary"
          size="default"
          href={`/meet-the-team`}
          className="border border-[#F3F5F6] bg-[#F3F5F6] text-lg font-normal uppercase text-primary-foreground transition-colors duration-300 ease-in-out hocus:border-[#F3F5F6] hocus:bg-primary-foreground hocus:text-[#F3F5F6]"
        >
          View All
        </Link>
      </div>
      <Slider
        opts={{
          loop: true,
        }}
        className="relative mx-auto mb-10 w-full md:mb-0"
      >
        <SliderContent>
          {team?.map((member, i) => (
            <SliderItem key={i} className="h-full basis-1/3">
              <div className="flex-center w-fit flex-col gap-16 bg-primary-background px-6 py-10 shadow-lg">
                <div className="relative flex items-center justify-center gap-y-6 overflow-clip">
                  <div className="flex size-full flex-col items-center justify-between gap-6 p-12 text-center">
                    <Image
                      src={member.image?.asset.url || ''}
                      alt={member.image?.asset.altText || ''}
                      width={member.image?.asset.metadata?.dimensions.width}
                      height={member.image?.asset.metadata?.dimensions.height}
                      className="mx-w-[200px] aspect-square h-full object-cover object-center"
                    />
                    <div className="flex flex-col gap-y-3">
                      <span className="uppercase text-primary-accent">
                        {member.role}
                      </span>
                      <h3 className="text-2xl">{member.name}</h3>
                    </div>
                    <div className="flex gap-x-3">
                      <Link
                        variant="secondary"
                        size="default"
                        className="border border-[#F3F5F6] bg-[#F3F5F6] text-lg font-normal uppercase text-primary-foreground shadow-none transition-colors duration-300 ease-in-out hocus:border-[#F3F5F6] hocus:bg-primary-foreground hocus:text-[#F3F5F6]"
                      >
                        Find Out More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SliderItem>
          ))}
        </SliderContent>
        {team && team?.length > 1 && (
          <>
            <SliderIndicators className="space-x-8" />
            <div className="absolute -bottom-8 left-8 flex items-start justify-center">
              <SliderPrevious className="size-9 border border-[#C5C7C9] bg-[#F9F9FA]" />
              <SliderNext className="size-9 border border-[#C5C7C9] bg-[#F9F9FA]" />
            </div>
          </>
        )}
      </Slider>
      <BottomBuffer visible={true} colour="grey" />
    </section>
  );
}
