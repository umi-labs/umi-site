'use client';
import React from 'react';
import { TeamPayload } from '@/types';
import Link from '@/app/_components/ui/link';
import { Icon } from '@/app/_components/ui/icon';
import Image from 'next/image';
import {
  TeamHeroBottom,
  TeamHeroBottomBorder,
  TeamHeroTop,
} from '@/app/_components/ui/svg-comps';

export default function TeamHero(props: TeamPayload) {
  return (
    <section className="relative mx-auto mt-14 flex min-h-[60svh] w-screen flex-col items-center justify-center gap-y-12 overflow-clip bg-primary-foreground px-10 py-10 text-primary-background md:px-16 lg:max-w-7xl lg:px-32">
      <TeamHeroTop className="absolute -right-1/3 top-0 z-0 h-1/2 w-full" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 md:my-20">
        {props.image && (
          <Image
            src={props.image.asset.url || ''}
            alt={props.image.asset.altText || ''}
            width={props.image.asset.metadata?.dimensions.width}
            height={props.image.asset.metadata?.dimensions.height}
            className="aspect-square max-h-44 w-auto object-cover object-center"
          />
        )}
        <h1 className="text-5xl font-bold">{props.name}</h1>
        <p className="text-lg">{props.description}</p>
        <div className="flex w-full items-center justify-center gap-6">
          {props.socialLinks?.map((socialLink, i) => (
            <Link
              key={i}
              href={socialLink.link || '#'}
              className="text-lg transition-colors duration-300 ease-in-out hocus:text-primary-foreground"
            >
              <Icon
                /* @ts-expect-error - type issue */
                type={socialLink.socialMedia}
                weight="regular"
                className="border-accent-background size-10 rounded-full border-2 bg-primary-background p-2 text-primary-foreground transition-colors duration-300 ease-in-out hocus:bg-primary-foreground hocus:text-primary-background"
              />
              <span className="sr-only">{socialLink.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <TeamHeroBottom className="absolute -left-1/3 bottom-0 z-0 h-1/2 w-full" />
      <TeamHeroBottomBorder className="absolute inset-x-0 bottom-0 z-0 h-fit w-full" />
    </section>
  );
}
