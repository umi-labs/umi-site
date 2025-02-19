'use client';

import { cn } from '@/lib/utils';
import { Icon } from '@/app/_components/ui/icon';
import Image from 'next/image';
import React from 'react';
import Link from '@/app/_components/ui/link';
import { CTATitleImageProps } from '@/types/components/cta-title-image';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';

export default function CTATitleImage({ data }: CTATitleImageProps) {
  return (
    <section
      id="CTATitleImage"
      className={cn(
        'relative mx-auto flex size-full max-w-7xl auto-rows-min grid-cols-1 grid-rows-2 flex-col-reverse items-center justify-center gap-10 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-24'
      )}
    >
      <div className="flex flex-col items-center justify-center gap-y-10 p-6 text-center md:items-start md:py-32 md:pl-10 md:text-start">
        <div className="flex flex-col gap-y-6">
          <span className="text-sm uppercase text-[#368DB1]">
            {data.subtitle}
          </span>
          <h2>{data.title}</h2>
        </div>
        <div className="flex flex-col gap-y-6">
          <CustomPortableText value={data.content} />
          {data.points && (
            <ul className="flex flex-col items-start justify-start gap-y-2 text-start">
              {data.points.map((point, i) => (
                <li key={i} className="flex items-start justify-center gap-x-3">
                  <Icon
                    type={point.icon.type}
                    weight={point.icon.weight}
                    className="mt-1 size-5 text-[#368DB1]"
                  />
                  <span className="text-lg font-light">{point.content}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-center gap-x-6">
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
      </div>
      <div className="flex aspect-square h-full w-full items-center justify-center">
        <Image
          src={data.image.asset?.url || ''}
          alt={data.image.asset?.altText || ''}
          width={data.image.asset?.metadata?.dimensions.width}
          height={data.image.asset?.metadata?.dimensions.height}
          className="h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
