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
  );
}
