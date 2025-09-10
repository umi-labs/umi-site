'use client';
import React from 'react';
import type { Button } from '@/types/generics';
import {
  Slider,
  SliderContent,
  SliderIndicators,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from '@/app/_components/ui/slider';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { getFeaturedProjects } from '@/app/_actions/projects';
import { useQuery } from '@tanstack/react-query';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';
import { Link as CustomLink } from '@/app/_components/ui/link';
import StandardArchiveCard from '@/app/_components/ui/card/archive-card';

interface PortfolioFullWidthProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    content?: PortableTextBlock[];
    buttons?: Button[] | undefined;
    buffers?: {
      top?: boolean | undefined;
      bottom?: boolean | undefined;
    };
  };
}

export default function PortfolioFullWidth({ data }: PortfolioFullWidthProps) {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getFeaturedProjects(),
  });

  return (
    <Container
      id="PortfolioFullWidth"
      options={{
        colour: 'dark',
        buffers: {
          top: data.buffers?.top,
          bottom: data.buffers?.bottom,
        },
        maxWidth: true,
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 text-center md:grid md:grid-cols-3 md:grid-rows-1 md:gap-16 md:px-10">
        <div className="flex h-fit w-full grid-flow-row-dense flex-col items-start justify-center gap-y-6 place-self-start text-left md:items-start md:justify-start md:text-start md:gap-y-10">
          {data.separator && <EyebrowSVG className="" />}
          <h2>{data.title}</h2>
          {data.content && <CustomPortableText value={data.content} />}
          <div className="flex w-full flex-col items-start justify-start gap-6 lg:flex-row lg:items-center">
            {data?.buttons?.map((button, i) => (
              <CustomLink
                key={i}
                link={button.link}
                size="default"
                variant={button.type}
                className="w-full lg:w-auto"
              >
                {button.title}
              </CustomLink>
            ))}
          </div>
        </div>
        {projects && (
          <Slider
            opts={{
              loop: true,
            }}
            className="relative col-span-2 mb-6 w-full md:mb-0"
          >
            <SliderContent className="-ml-4 md:-ml-10">
              {projects?.map((project, i) => (
                <SliderItem
                  key={i}
                  className="relative ml-4 md:ml-9"
                >
                  <StandardArchiveCard
                    archive={project}
                    index={i}
                    postType="project"
                  />
                </SliderItem>
              ))}
            </SliderContent>
            <SliderIndicators className="space-x-8" />
            <div className="absolute -bottom-8 left-8 flex items-start justify-center">
              <SliderPrevious className="size-9 border border-[#C5C7C9] bg-[#F9F9FA]" />
              <SliderNext className="size-9 border border-[#C5C7C9] bg-[#F9F9FA]" />
            </div>
          </Slider>
        )}
      </div>
    </Container>
  );
}
