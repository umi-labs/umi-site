'use client';
import React from 'react';
import { cn } from '@/app/_utils';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { CTAWithFormProps } from '@/types/components/cta-with-form';

export default function CTAWithForm({ data }: CTAWithFormProps) {
  return (
    <section
      id="CTAWithForm"
      className={cn(
        'flex-center relative mx-auto size-full max-h-[571px] min-h-[40svh] max-w-7xl bg-primary-foreground bg-[url("/assets/images/wave-pattern-light-bg.svg")] text-primary-background',
        data.buffers?.top && 'mt-24',
        data.buffers?.bottom && 'mb-24'
      )}
    >
      <TopBuffer visible={data.buffers?.top} />
      <div className="flex-center relative w-full place-items-center gap-x-36 overflow-clip px-8 py-32 lg:px-10">
        <div className="flex-center z-10 row-span-4 size-full flex-col gap-y-10 text-center">
          <div className="flex flex-col gap-y-6">
            {data.subtitle && <span>{data.subtitle}</span>}
            <h2>{data.title}</h2>
          </div>
          <CustomPortableText value={data.content} />
        </div>
      </div>
      <BottomBuffer visible={data.buffers?.bottom} />
    </section>
  );
}
