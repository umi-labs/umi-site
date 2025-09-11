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
    <section className="relative mx-auto mt-14 flex min-h-[60svh] w-full flex-col items-center justify-center gap-y-12 overflow-clip px-10 py-20 text-white md:px-16 lg:max-w-7xl lg:px-32">
      {/* Dark Umi Aurora Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(49, 62, 78, 0.9), transparent 68%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(54, 141, 177, 0.8), transparent 68%),
            radial-gradient(ellipse 60% 50% at 60% 65%, rgba(176, 222, 230, 0.6), transparent 68%),
            radial-gradient(ellipse 65% 40% at 50% 60%, rgba(255, 228, 140, 0.4), transparent 68%),
            radial-gradient(ellipse 50% 30% at 30% 40%, rgba(236, 205, 127, 0.3), transparent 68%),
            linear-gradient(180deg, #1e293b 0%, #0f172a 100%)
          `,
        }}
      />
      
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 md:my-20">
        {props.image && (
          <div className="relative overflow-hidden rounded-full shadow-2xl">
            <Image
              src={props.image.asset?.url || ''}
              alt={props.image.asset?.altText || ''}
              width={props.image.asset?.metadata?.dimensions.width}
              height={props.image.asset?.metadata?.dimensions.height}
              className="aspect-square max-h-44 w-auto object-cover object-center"
            />
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
              <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </div>
          </div>
        )}
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#B0DEE6] to-[#FFE48C] bg-clip-text text-transparent text-center">
          {props.name}
        </h1>
        <p className="text-xl text-white/90 text-center max-w-2xl leading-relaxed">{props.description}</p>
        <div className="flex w-full items-center justify-center gap-6">
          {props.socialLinks?.map((socialLink, i) => (
            <Link
              key={i}
              href={socialLink.link || '#'}
              className="group text-lg transition-all duration-300 ease-in-out hover:scale-110"
            >
              <Icon
                /* @ts-expect-error - type issue */
                type={socialLink.socialMedia}
                weight="regular"
                className="size-12 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:bg-[#B0DEE6] group-hover:text-[#1a2332] group-hover:shadow-lg"
              />
              <span className="sr-only">{socialLink.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
