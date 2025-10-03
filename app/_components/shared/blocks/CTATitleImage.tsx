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
      className="w-full py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-24">
          
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-8 text-center md:text-left">
            
            {/* Header */}
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#368DB1]">
                {data.subtitle}
              </span>
              <h2 className="text-4xl font-light leading-[1.2] text-[#1a2332] md:text-5xl lg:text-6xl">
                {data.title}
              </h2>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <CustomPortableText 
                value={data.content} 
                paragraphClasses="text-lg text-[#313E4E]/80 leading-relaxed md:text-xl"
              />
              
              {/* Points List */}
              {data.points && data.points.length > 0 && (
                <ul className="space-y-4 text-center md:text-left">
                  {data.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-4 justify-center md:justify-start">
                      <div className="mt-1 flex-shrink-0 rounded-full bg-gradient-to-br from-[#B0DEE6]/20 to-[#368DB1]/20 p-2">
                        <Icon
                          type={point.icon.type}
                          weight={point.icon.weight}
                          className="h-5 w-5 text-[#368DB1]"
                        />
                      </div>
                      <span className="text-lg font-medium text-[#313E4E]">
                        {point.content}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Buttons */}
            {data.buttons && data.buttons.length > 0 && (
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center md:justify-start">
                {data.buttons.map((button, i) => (
                  <Link
                    key={i}
                    variant={button.type}
                    size="default"
                    link={button.link}
                    className="w-full sm:w-auto"
                  >
                    {button.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="flex justify-center md:justify-end">
            <div className="relative h-80 w-80 overflow-hidden rounded-2xl shadow-2xl group sm:h-96 sm:w-96">
              {data.image?.asset?.url ? (
                <Image
                  src={data.image.asset.url}
                  alt={data.image.asset.altText || data.title || 'CTA Image'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#B0DEE6]/20 to-[#368DB1]/20">
                  <span className="text-lg font-medium text-[#313E4E]/60">
                    No image available
                  </span>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
