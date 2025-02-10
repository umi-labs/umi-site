'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { HeroWithMediaProps } from '@/types/components/heroWithMedia';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Video from '@/app/_components/ui/video';
import { BackgroundSVG, EyebrowSVG } from '@/app/_components/ui/svg-comps';

export default function HeroWithMedia({ data }: HeroWithMediaProps) {
  return (
    <section
      className={cn(
        'relative mx-auto flex min-h-full w-full max-w-7xl items-center justify-center overflow-visible text-black'
      )}
    >
      <div
        className={cn(
          'relative z-10 flex w-full flex-col items-center justify-center gap-y-10 py-10 text-center md:py-32',
          data?.background === 'light' ? 'text-[#313E4E]' : 'text-white'
        )}
      >
        {data?.background === 'dark' && (
          <div
            className={cn(
              'absolute left-0 top-0 -z-10 flex h-1/2 w-full items-end justify-end bg-[#313E4E] text-white'
            )}
          >
            <div className="relative h-full w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1440"
                height="110"
                viewBox="0 0 1440 110"
                fill="none"
                className="absolute bottom-0 left-0 -z-10 h-auto w-full translate-y-1/2 pb-6 md:pb-10 lg:pb-14"
              >
                <path
                  d="M520.766 0.805773C390.85 1.61154 119.457 31.8058 0 46.8058V109.806H1440V86.8058C1185.38 80.7899 846.57 -1.21494 520.766 0.805773Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        )}
        <div
          className={cn(
            'relative flex w-full flex-col items-center justify-center gap-y-10 px-6 md:px-28'
          )}
        >
          {data?.separator && <EyebrowSVG />}
          <h2>{data.title}</h2>
          <CustomPortableText value={data.content} />
          <div className="flex w-full items-center justify-center gap-6">
            {data?.buttons?.map((button, i) => (
              <Link
                key={i}
                link={button.link}
                size="default"
                variant={button.type}
                className="w-full md:w-fit"
              >
                {button.title}
              </Link>
            ))}
          </div>
          <div>
            {data?.mediaType === 'image' ? (
              data?.image &&
              data?.image.asset?.url && (
                <Image
                  src={data.image?.asset?.url || ''}
                  alt={data.image?.asset?.altText || ''}
                  width={data.image?.asset?.metadata?.dimensions?.width}
                  height={data.image?.asset?.metadata?.dimensions?.height}
                />
              )
            ) : (
              <Video {...data.video!} />
            )}
          </div>
          {data?.background !== 'dark' && (
            <BackgroundSVG className="absolute -left-16 bottom-0 -z-10 h-auto w-full md:w-2/3 2xl:w-1/2" />
          )}
        </div>
        {data?.bottomContent && (
          <div className="flex flex-col items-center justify-center gap-y-10 px-6 text-primary-foreground md:px-28">
            <h2>{data.bottomContent.title}</h2>
            <CustomPortableText value={data.bottomContent.content} />
          </div>
        )}
      </div>
    </section>
  );
}
