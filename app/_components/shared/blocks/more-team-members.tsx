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
import Container from '@/app/_components/ui/container';

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
    <Container
      id="MoreTeamMembers"
      options={{
        colour: 'light',
        buffers: {
          top: true,
          bottom: true,
        },
      }}
      className="relative overflow-hidden py-20 md:py-32"
    >
      {/* Dark Umi Aurora Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(49, 62, 78, 0.9), transparent 68%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(54, 141, 177, 0.8), transparent 68%),
            radial-gradient(ellipse 60% 50% at 60% 65%, rgba(176, 222, 230, 0.6), transparent 68%),
            radial-gradient(ellipse 65% 40% at 50% 60%, rgba(255, 228, 140, 0.4), transparent 68%),
            radial-gradient(ellipse 50% 30% at 30% 40%, rgba(236, 205, 127, 0.3), transparent 68%),
            linear-gradient(180deg, #1e293b 0%, #0f172a 100%)
          `,
        }}
      />
      
      <div className="relative z-10 flex w-full items-center justify-between gap-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-[#B0DEE6] to-[#FFE48C] bg-clip-text text-transparent">
          More Team Members
        </h2>
        <Link
          variant="secondary"
          size="default"
          href={`/meet-the-team`}
          className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-[#B0DEE6] hover:text-[#1a2332] transition-all duration-300"
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
              <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/5 via-[#368DB1]/5 to-[#FFE48C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex h-full flex-col items-center justify-between gap-6 p-8 text-center">
                  <div className="relative overflow-hidden rounded-full shadow-lg">
                    <Image
                      src={member.image?.asset?.url || ''}
                      alt={member.image?.asset?.altText || ''}
                      width={member.image?.asset?.metadata?.dimensions.width}
                      height={member.image?.asset?.metadata?.dimensions.height}
                      className="aspect-square max-w-[200px] h-auto object-cover object-center"
                    />
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                      <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-y-3">
                    <span className="uppercase text-[#313E4E] font-medium text-sm tracking-wider">
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1a2332] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#B0DEE6] group-hover:to-[#FFE48C] group-hover:bg-clip-text transition-all duration-500">
                      {member.name}
                    </h3>
                  </div>
                  
                  <div className="flex gap-x-3">
                    <Link
                      variant="secondary"
                      size="default"
                      className="bg-[#313E4E] text-white hover:bg-[#B0DEE6] hover:text-[#1a2332] transition-all duration-300"
                    >
                      Find Out More
                    </Link>
                  </div>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                  <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </div>

                {/* Border accent */}
                <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#B0DEE6]/20 via-[#368DB1]/20 to-[#FFE48C]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SliderItem>
          ))}
        </SliderContent>
        {team && team?.length > 1 && (
          <>
            <SliderIndicators className="space-x-8" />
            <div className="absolute -bottom-8 left-8 flex items-start justify-center">
              <SliderPrevious className="size-9 border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-[#B0DEE6] hover:text-[#1a2332] transition-all duration-300" />
              <SliderNext className="size-9 border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-[#B0DEE6] hover:text-[#1a2332] transition-all duration-300" />
            </div>
          </>
        )}
      </Slider>
    </Container>
  );
}
