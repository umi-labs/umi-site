'use client';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { HeroWithMediaProps } from '@/types/components/heroWithMedia';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Video from '@/app/_components/ui/video';
import { BackgroundSVG, WaveSVG } from '@/app/_components/ui/svg-comps';
import { motion, useInView } from 'motion/react';

export default function HeroWithMedia({ data }: HeroWithMediaProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Aurora Dream Vivid Bloom */}
      <div className="fixed top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 70% 20%, rgba(54, 141, 177, 0.85), transparent 68%),
              radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 228, 140, 0.75), transparent 68%),
              radial-gradient(ellipse 60% 50% at 60% 65%, rgba(176, 222, 230, 0.98), transparent 68%),
              radial-gradient(ellipse 65% 40% at 50% 60%, rgba(236, 205, 127, 0.3), transparent 68%),
              linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)
            `,
          }}
        />
      </div>
      
      <section
        ref={containerRef}
        id="HeroWithMedia"
        className={cn(
          'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-0 overflow-visible pt-20 pb-10 md:gap-12 md:pt-44 md:pb-16 lg:gap-y-16'
        )}
      >
      <div
        className={cn(
          'relative z-10 flex w-full flex-col items-center justify-center gap-y-10 pt-10 text-center md:pt-0',
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
            'relative flex w-full flex-col items-center justify-center gap-y-8 md:gap-y-16 px-6 md:px-28 pt-16 md:pt-0'
          )}
        >
          {/* Separator */}
          {data?.separator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {/* @ts-expect-error - type casting is not defined */}
              <WaveSVG />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className={cn(
              "text-5xl md:text-6xl lg:text-7xl font-light text-center leading-tight",
              data?.background === 'light' 
                ? "bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
                : "text-white"
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {data.title}
          </motion.h1>

          {/* Content */}
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <CustomPortableText 
              value={data.content} 
              paragraphClasses={cn(
                "text-center text-lg md:text-xl leading-relaxed",
                data?.background === 'light' ? "text-[#313E4E]/80" : "text-white/90"
              )}
            />
          </motion.div>

          {/* Buttons */}
          {data?.buttons && data.buttons.length > 0 && (
            <motion.div 
              className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              {data.buttons.map((button, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + (i * 0.1), 
                    ease: "easeOut" 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    link={button.link}
                    size="default"
                    variant={button.type}
                    className="w-full md:w-fit"
                  >
                    {button.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Media */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            {data?.mediaType === 'image' ? (
              data?.image &&
              data?.image.asset?.url && (
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={data.image?.asset?.url || ''}
                    alt={data.image?.asset?.altText || ''}
                    width={data.image?.asset?.metadata?.dimensions?.width}
                    height={data.image?.asset?.metadata?.dimensions?.height}
                    className="w-full h-auto object-cover"
                  />
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                    <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>
                </div>
              )
            ) : (
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Video {...data.video!} />
              </div>
            )}
          </motion.div>
        </div>
        {/* Bottom content */}
        {data?.bottomContent && (
          <motion.div 
            className="group mx-auto flex w-full max-w-4xl flex-col items-start justify-start gap-y-4 px-6 text-primary-foreground md:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent">
              {data.bottomContent.title}
            </h2>
            <div className="relative">
              {/* Decorative left border */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#368DB1] via-[#B0DEE6] to-[#FFE48C] rounded-full opacity-60"></div>
              
              <div className="pl-8">
                <CustomPortableText 
                  value={data.bottomContent.content} 
                  paragraphClasses="text-left text-lg text-[#313E4E]/90 leading-relaxed font-medium tracking-wide"
                />
              </div>
              
              {/* Subtle background highlight */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#B0DEE6]/5 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
    </>
  );
}
