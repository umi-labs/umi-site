'use client';
import React from 'react';
import { cn } from '@/app/_utils';
import type { CTASimpleProps } from '@/types/components/cta-simple';
import Image from 'next/image';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Link from '@/app/_components/ui/link';
import Container from '@/app/_components/ui/container';

export default function CTASimple({ data }: CTASimpleProps) {
  const { layout, image, title, content, buttons, subtitle, _type } =
    data || {};

  return (
    <Container
      id="CTASimple"
      options={{
        colour: 'transparent',
      }}
      className="px-0"
    >
      <div className="relative mx-auto grid min-h-[35svh] w-screen max-w-7xl grid-cols-1 grid-rows-6 place-items-center gap-x-36 overflow-clip px-8 py-10 md:grid-cols-5 md:grid-rows-1 lg:px-10">
        {/* Glassmorphic background */}
        <div className="absolute inset-0 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 " />
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
          <CustomPortableText value={content} />
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
    </Container>
  );
}
