'use client';

import React from 'react';
import type { Icon as IconType } from '@/types/generics';
import {
  Slider,
  SliderContent,
  SliderIndicators,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from '@/app/_components/ui/slider';
import { Icon } from '@/app/_components/ui/icon';
import { cn } from '@/app/_utils';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';

interface Props {
  data: {
    title: string;
    description: string;
    carousel: {
      title: string;
      points: {
        icon: IconType;
        content: string;
      }[];
    }[];
    buffers?: {
      top?: boolean | undefined;
      bottom?: boolean | undefined;
    };
  };
}

export default function Carousel({ data }: Props) {
  return (
    <section
      className={cn(
        'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-24 bg-[#FAFAFA] px-10 py-10 md:py-32',
        data.buffers?.top && 'xl:mt-30 mt-10 md:mt-20 lg:mt-28',
        data.buffers?.bottom && 'mb-32'
      )}
    >
      <TopBuffer colour="grey" visible={data.buffers?.top} />
      <div className="flex w-full flex-col items-start justify-start gap-6">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <Slider
        opts={{
          loop: true,
          align: 'start',
        }}
        className="relative col-span-2 mb-10 w-full md:mb-0 md:w-[calc(100%-6rem)]"
      >
        <SliderContent className="relative -ml-1 md:-ml-4">
          {data.carousel.map((item, i) => (
            <SliderItem
              key={i}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex flex-col gap-y-9 bg-primary-background pl-1 shadow-md md:gap-x-9 lg:pl-4">
                <div className="col-span-1 p-4 md:p-8">
                  <div className="flex flex-col items-start justify-start gap-y-8">
                    <h2 className="text-2xl font-semibold text-primary-foreground hover:no-underline">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.points.map((point, i) => (
                        <span
                          key={i}
                          className="flex items-start justify-start gap-x-2 text-left"
                        >
                          <Icon
                            type={point.icon.type}
                            weight={point.icon.weight}
                            className="mt-1 size-14 text-[#368DB1]"
                          />
                          &nbsp;
                          <span className="text-black">{point.content}</span>
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </SliderItem>
          ))}
        </SliderContent>
        <SliderIndicators className="hidden space-x-8 md:flex" />
        <div className="absolute inset-x-1/2 -bottom-8 flex items-start justify-center lg:inset-x-auto lg:left-8">
          <SliderPrevious className="size-9 border border-[#C5C7C9] bg-[#F9F9FA]" />
          <SliderNext className="size-9 border border-[#C5C7C9] bg-[#F9F9FA]" />
        </div>
      </Slider>
      <BottomBuffer colour="grey" visible={data.buffers?.bottom} />
    </section>
  );
}
