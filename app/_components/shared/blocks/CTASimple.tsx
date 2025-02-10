'use client';
import React from 'react';
import { cn } from '@/app/_utils';
import type { CTASimpleProps } from '@/types/components/cta-simple';
import Image from 'next/image';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';
import { BackgroundPatternSVG } from '@/app/_components/ui/svg-comps';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Link from '@/app/_components/ui/link';

export default function CTASimple({ data }: CTASimpleProps) {
  return (
    <section
      className={cn(
        'flex-center relative mx-auto size-full min-h-fit max-w-7xl bg-primary-foreground text-primary-background',
        data.buffers?.top && 'mt-32',
        data.buffers?.bottom && 'mb-32',
        data.layout?.colour === 'dark'
          ? 'fill-primary-secondary-accent/50 bg-primary-foreground text-primary-background'
          : 'fill-primary-foreground/50 bg-primary-secondary-accent text-primary-foreground'
      )}
    >
      <TopBuffer
        visible={data.buffers?.top}
        colour={data.layout?.colour === 'dark' ? 'blue' : 'grey'}
        className="w-full max-w-7xl"
      />
      <div className="relative grid min-h-[35svh] w-screen grid-cols-1 grid-rows-6 place-items-center gap-x-36 overflow-clip px-8 py-10 md:grid-cols-5 md:grid-rows-1 lg:px-10">
        <BackgroundPatternSVG
          className={cn(
            'absolute -left-1/2 bottom-0 -z-0 h-full w-auto md:left-0 md:h-auto md:w-full',
            data.layout?.colour === 'dark'
              ? 'fill-primary-secondary-accent'
              : 'fill-primary-foreground'
          )}
        />
        {data.image && (
          <div className="flex-center row-span-2 size-full md:col-span-2">
            <Image
              src={data.image.asset.url || ''}
              width={data.image.asset.metadata?.dimensions.width}
              height={data.image.asset.metadata?.dimensions.height}
              alt={data.image.asset.altText || ''}
              className="obje ct-center object-contain"
            />
          </div>
        )}
        <div className="flex-center z-10 row-span-4 size-full flex-col gap-y-10 text-center md:col-span-3">
          <div className="flex flex-col gap-y-6">
            <span>{data.subtitle}</span>
            <h2>{data.title}</h2>
          </div>
          <CustomPortableText
            paragraphClasses={cn(
              data.layout?.colour === 'dark'
                ? 'text-primary-background'
                : 'text-primary-foreground'
            )}
            value={data.content}
          />
          {data.image &&
            data.buttons &&
            data.buttons.map((button, i) => (
              <Link
                key={i}
                variant={button.type}
                size="default"
                link={button.link}
              >
                {button.title}
              </Link>
            ))}
        </div>
        {!data.image && (
          <div className="flex-center z-10 row-span-2 size-full gap-3 md:col-span-2">
            {data.buttons &&
              data.buttons.map((button, i) => (
                <Link
                  key={i}
                  variant={button.type}
                  size="default"
                  link={button.link}
                >
                  {button.title}
                </Link>
              ))}
          </div>
        )}
      </div>
      <BottomBuffer
        visible={data.buffers?.bottom}
        colour={data.layout?.colour === 'dark' ? 'blue' : 'grey'}
        className="h-fit w-full max-w-7xl"
      />
    </section>
  );
}
