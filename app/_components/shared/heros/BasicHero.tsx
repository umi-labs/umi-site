import { Button as ButtonType } from '@/types/generics';
import { WaveSVG } from '@/app/_components/ui/svg-comps';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Link from '@/app/_components/ui/link';
import React from 'react';
import { PortableTextBlock } from 'next-sanity';
import { motion } from 'motion/react';

export interface BasicHeroProps {
  data: {
    separator?: boolean;
    heading: string;
    description?: PortableTextBlock[];
    buttons?: ButtonType[];
  };
}

export default function BasicHero({ data }: BasicHeroProps) {
  const { heading, description, buttons, separator } = data;
  return (
    <>
      {/* Full-width subtle gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/3 via-[#368DB1]/2 to-[#FFE48C]/3" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#313E4E]/2 via-transparent to-[#368DB1]/3" />
      </div>
      
      <section
        id="BasicHero"
        className="relative mx-auto mb-8 mt-24 flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-10 px-6 md:px-28"
      >
      {/* @ts-expect-error - type casting is not defined */}
      {separator && <WaveSVG />}
      <h1>{heading}</h1>
      {description && (
        <CustomPortableText
          value={description}
          paragraphClasses="text-center"
        />
      )}
      <div className="flex w-full items-center justify-center gap-6">
        {buttons?.map((button, i) => (
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
    </section>
    </>
  );
}
