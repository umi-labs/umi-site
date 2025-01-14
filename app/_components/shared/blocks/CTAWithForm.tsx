'use client';
import React from 'react';
import { cn } from '@/app/_utils';
import type { CTASimpleProps } from '@/types/components/ctaSimple';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';

export default function CTAWithForm({ data }: CTASimpleProps) {
  return (
    <section
      className={cn(
        'flex-center relative mx-auto size-full max-h-[571px] min-h-[40svh] max-w-7xl bg-primary-foreground bg-[url("/assets/images/wave-pattern-light-bg.svg")] text-primary-background',
        data.topBuffer && 'mt-24',
        data.bottomBuffer && 'mb-24'
      )}
    >
      <TopBuffer visible={data.topBuffer} />
      <div className="flex-center relative w-full place-items-center gap-x-36 overflow-clip px-8 py-32 lg:px-10">
        <div className="flex-center z-10 row-span-4 size-full flex-col gap-y-10 text-center">
          <div className="flex flex-col gap-y-6">
            {data.subtitle && <span>{data.subtitle}</span>}
            <h2>{data.title}</h2>
          </div>
          <p>{data.content}</p>
        </div>
      </div>
      <BottomBuffer visible={data.bottomBuffer} />
    </section>
  );
}
