'use client';
import React, { useRef } from 'react';
import { ProjectPayload } from '@/types';
import { cn } from '@/app/_utils';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import ArchivesFilterableBlock from '@/app/_components/shared/blocks/archive/archives-filterable-block';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getArchives } from '@/app/_actions/archive-queries';
import { motion, useInView } from 'motion/react';

interface Props {
  data: {
    separator?: boolean | undefined;
    title: string;
    description?: string | undefined;
    postType?: 'project' | 'post' | undefined;
    archive?: ProjectPayload[] | undefined;
  };
}

export default function ArchivesSection({ data }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Aurora Dream Vivid Bloom Gradient Background */}
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
        className={cn(
          'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-0 overflow-visible pt-32 md:pt-32 lg:pt-40 pb-16 md:gap-12 md:pb-24 lg:gap-y-16'
        )}
      >
      <motion.div 
        className="flex-center flex-col gap-y-10 px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {data.separator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <EyebrowSVG className="" />
          </motion.div>
        )}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {data.title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-[#313E4E]/80 leading-relaxed max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {data.description}
        </motion.p>
      </motion.div>

      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <ArchivesFilterableBlock
          archives={data.archive}
          postType={data.postType}
        />
      </motion.div>
    </section>
    </>
  );
}
