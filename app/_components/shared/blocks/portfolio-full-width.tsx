'use client';
import React from 'react';
import Link from '@/app/_components/ui/link';
import { cn } from '@/app/_utils';
import type { Button } from '@/types/generics';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';
import {
  Slider,
  SliderContent,
  SliderIndicators,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from '@/app/_components/ui/slider';
import Image from 'next/image';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { getFeaturedProjects } from '@/app/_actions/projects';
import { useQuery } from '@tanstack/react-query';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';

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
    <section
      className={cn(
        'relative mx-auto flex min-h-full w-full max-w-7xl items-center justify-center overflow-visible bg-[#FAFAFA] py-10 md:py-32',
        data.buffers?.top && 'xl:mt-30 mt-10 md:mt-20 lg:mt-28',
        data.buffers?.bottom && 'mb-32'
      )}
    >
      <TopBuffer
        colour="grey"
        visible={data.buffers?.top}
        className={'w-full max-w-7xl'}
      />
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 text-center md:grid md:grid-cols-3 md:grid-rows-1 md:gap-16 md:px-10">
        <div className="flex h-fit w-full grid-flow-row-dense flex-col items-center justify-center gap-y-10 place-self-start text-center md:items-start md:justify-start md:text-start">
          {data.separator && <EyebrowSVG className="" />}
          <h2>{data.title}</h2>
          {data.content && <CustomPortableText value={data.content} />}
          <div className="flex w-full flex-col items-start justify-start gap-6 lg:flex-row lg:items-center">
            {data?.buttons?.map((button, i) => (
              <Link
                key={i}
                link={button.link}
                size="default"
                variant={button.type}
                className="w-full lg:w-auto"
              >
                {button.title}
              </Link>
            ))}
          </div>
        </div>
        {projects && (
          <Slider
            opts={{
              loop: true,
            }}
            className="relative col-span-2 mb-10 w-full md:mb-0"
          >
            <SliderContent className="-ml-10">
              {projects?.map((project, i) => (
                <SliderItem
                  key={i}
                  className="relative ml-9 flex aspect-square h-auto max-w-sm basis-3/4 flex-col items-center justify-center gap-y-6 overflow-clip bg-primary-accent md:basis-1/2"
                >
                  <Link
                    className="group absolute inset-0 z-20 h-full w-full"
                    href={`/our-work/${project.slug}`}
                  >
                    <Image
                      src={project.coverImage?.asset?.url || ''}
                      alt={project.coverImage?.asset?.altText || ''}
                      width={
                        project.coverImage?.asset?.metadata?.dimensions.width
                      }
                      height={
                        project.coverImage?.asset?.metadata?.dimensions.height
                      }
                      className="absolute inset-0 -z-0 h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 z-[1] h-full w-full bg-gradient-to-b from-black/20 to-black/40" />
                    <div className="z-10 flex flex-col items-center justify-center gap-y-6">
                      <h2 className="text-2xl font-semibold text-primary-background group-hover:no-underline">
                        {project.title}
                      </h2>
                      <span className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-700">
                        {project.tags?.map((tag, i) => (
                          <span
                            className="rounded-full bg-white px-3 py-2 uppercase hocus:no-underline"
                            key={i}
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </div>
                  </Link>
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
      <BottomBuffer
        colour="grey"
        visible={data.buffers?.bottom}
        className={'w-full max-w-7xl'}
      />
    </section>
  );
}
