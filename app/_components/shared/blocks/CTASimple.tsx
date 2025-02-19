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
  const { buffers, layout, image, title, content, buttons, subtitle, _type } =
    data || {};

  console.log(buffers);

  return (
    <section
      id="CTASimple"
      className={cn(
        'flex-center relative size-full min-h-fit bg-primary-foreground text-primary-background',
        buffers?.top && 'mt-32',
        buffers?.bottom && 'mb-32',
        layout?.colour === 'dark'
          ? 'fill-primary-secondary-accent/50 bg-primary-foreground text-primary-background'
          : 'fill-primary-foreground/50 bg-primary-secondary-accent text-primary-foreground'
      )}
    >
      <TopBuffer visible={buffers?.top} colour={layout?.colour} />
      <div className="relative mx-auto grid min-h-[35svh] w-screen max-w-7xl grid-cols-1 grid-rows-6 place-items-center gap-x-36 overflow-clip px-8 py-10 md:grid-cols-5 md:grid-rows-1 lg:px-10">
        <BackgroundPatternSVG
          className={cn(
            'absolute -left-1/2 bottom-0 -z-0 h-full w-auto md:left-0 md:h-auto md:w-full',
            layout?.colour === 'dark'
              ? 'fill-primary-secondary-accent'
              : 'fill-primary-foreground'
          )}
        />
        {image && (
          <div className="flex-center row-span-2 size-full md:col-span-2">
            <Image
              src={image.asset?.url || ''}
              width={image.asset?.metadata?.dimensions.width}
              height={image.asset?.metadata?.dimensions.height}
              alt={image.asset?.altText || ''}
              className="z-10 object-contain object-center"
            />
          </div>
        )}
        <div className="flex-center z-10 row-span-4 size-full flex-col gap-y-10 text-center md:col-span-3">
          <div className="flex flex-col gap-y-6">
            <span>{subtitle}</span>
            <h2>{title}</h2>
          </div>
          <CustomPortableText
            paragraphClasses={cn(
              layout?.colour === 'dark'
                ? 'text-primary-background'
                : 'text-primary-foreground'
            )}
            value={content}
          />
          {image &&
            buttons &&
            buttons.map((button, i) => (
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
        {!image && (
          <div className="flex-center z-10 row-span-2 size-full gap-3 md:col-span-2">
            {buttons &&
              buttons.map((button, i) => (
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
      <BottomBuffer visible={buffers?.bottom} colour={layout?.colour} />
    </section>
  );
}
