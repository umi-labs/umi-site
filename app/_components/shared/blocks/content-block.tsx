import React from 'react';
import type { Image as ImageType, Link as LinkType } from '@/types/generics';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';
import Video, { VideoProps } from '@/app/_components/ui/video';
import { cn } from '@/app/_utils';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { PortableTextBlock } from 'next-sanity';

interface ContentBlockProps {
  data: {
    title: string;

    description: PortableTextBlock[];
    type: 'umiCulture' | 'standardVideo' | 'standardImage';
    layout?: {
      justify?:
        | 'normal'
        | 'center'
        | 'start'
        | 'end'
        | 'stretch'
        | 'between'
        | 'around'
        | 'evenly';
      align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
    };
    imageGrid: ImageType[];
    cardGrid: {
      image: ImageType;
      title: string;
      description: string;
      link: LinkType;
    }[];
    video?: VideoProps;
    image?: ImageType;
  };
}

export default function ContentBlock({ data }: ContentBlockProps) {
  console.log(data);
  return (
    <section className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-12 px-10 py-10 md:py-32 lg:gap-y-24">
      <div
        className={cn(
          `items-${data.layout?.align} flex w-full flex-col justify-${data.layout?.justify} gap-6`
        )}
      >
        <h2>{data.title}</h2>
      </div>
      {data.type === 'umiCulture' && (
        <div className="grid w-full grid-flow-row-dense items-center justify-center gap-9 md:grid-cols-4 md:grid-rows-2">
          {data.imageGrid.map((item, i) => (
            <div
              key={i}
              className="relative flex size-full items-center justify-center gap-y-6 overflow-clip md:first-of-type:col-span-2 md:first-of-type:row-span-2"
            >
              {item && (
                <Image
                  src={item.asset.url || ''}
                  alt={item.asset.altText || ''}
                  width={item.asset.metadata?.dimensions.width}
                  height={item.asset.metadata?.dimensions.height}
                  className="size-full object-cover object-center"
                />
              )}
            </div>
          ))}
        </div>
      )}
      {data.type === 'standardVideo' && data.video && (
        <div className="relative aspect-video w-full">
          <Video {...data.video} />
        </div>
      )}
      {data.type === 'standardImage' && data.image && (
        <div className="relative aspect-video w-full">
          <Image
            src={data.image.asset.url || ''}
            alt={data.image.asset.altText || ''}
            width={data.image.asset.metadata?.dimensions.width}
            height={data.image.asset.metadata?.dimensions.height}
            className="object-cover object-center"
          />
        </div>
      )}
      <CustomPortableText value={data.description} />
      {data.type === 'umiCulture' && (
        <div className="grid w-full grid-flow-row grid-cols-1 items-center justify-center gap-9 md:grid-cols-2 lg:grid-cols-3">
          {data.cardGrid.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center gap-y-6 bg-primary-background text-center text-primary-foreground shadow-lg"
            >
              <Image
                src={item.image?.asset.url || ''}
                alt={item.image?.asset.altText || ''}
                width={item.image?.asset.metadata?.dimensions.width}
                height={item.image?.asset.metadata?.dimensions.height}
                className="size-full overflow-clip rounded-full object-cover object-center"
              />
              <div className="z-10 flex size-full flex-col items-center justify-between gap-y-6 p-12 xl:px-20 xl:py-24">
                <div className="flex flex-col gap-y-3">
                  <h3 className="text-xl">{item.title}</h3>
                  <span>{item.description}</span>
                </div>
                <div className="flex gap-x-3">
                  <Link
                    variant="link"
                    size="link"
                    /* @ts-ignore */
                    href={item}
                    className="text-lg uppercase text-primary-accent transition-all duration-300 ease-in-out hocus:underline"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
