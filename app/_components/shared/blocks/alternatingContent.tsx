'use client';

import React, { useRef } from 'react';
import { cn } from '@/app/_utils';
import Image from 'next/image';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';
import { motion, useInView } from 'motion/react';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';

interface AlternatingContentProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    description?: string | undefined;
    content: {
      title: string;
      description: PortableTextBlock[];
      image: {
        asset?: {
          url: string;
          altText: string;
          metadata: {
            dimensions: {
              aspectRatio: number;
              height: number;
              _type: string;
              width: number;
            };
          };
        };
      };
    }[];
  };
}

export default function AlternatingContent({ data }: AlternatingContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Container
      id="AlternatingContent"
      options={{
        colour: 'transparent',
        maxWidth: true,
      }}
      className="py-16 md:py-24"
    >
      
      <div ref={containerRef} className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="mb-16 flex w-full flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.56, ease: "easeOut" }}
        >
          {data.separator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.42, delay: 0.14, ease: "easeOut" }}
            >
              <EyebrowSVG className="" />
            </motion.div>
          )}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.56, delay: 0.21, ease: "easeOut" }}
          >
            {data.title}
          </motion.h2>
          {data.description && (
            <motion.p 
              className="max-w-4xl text-center text-lg md:text-xl text-[#313E4E] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.56, delay: 0.28, ease: "easeOut" }}
            >
              {data.description}
            </motion.p>
          )}
        </motion.div>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-16 overflow-hidden">
          {data.content.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Card = ({
  item: { title, description, image },
  index = 0,
}: {
  item: AlternatingContentProps['data']['content'][0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { asset } = image || {};
  const { url, metadata, altText } = image?.asset || {};
  const { dimensions } = metadata || {};

  return (
    <motion.div 
      ref={cardRef}
      className="group relative w-full overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ 
        duration: 0.56, 
        delay: index * 0.105, 
        ease: "easeOut" 
      }}
    >
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Image Section - Left Side */}
        {asset && url && (
          <motion.div
            className="relative group/image flex-shrink-0 w-full lg:w-64 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.56, 
              delay: index * 0.105 + 0.14, 
              ease: "easeOut" 
            }}
          >
            {/* Image container */}
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-[#B0DEE6]/5 to-[#368DB1]/5 p-8">
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-xl border border-[#B0DEE6]/20" />
              
              {/* Image */}
              <div className="relative w-full">
                <Image
                  src={url || ''}
                  alt={altText || ''}
                  width={dimensions?.width || 200}
                  height={dimensions?.height || 200}
                  className="relative z-10 w-full h-auto object-contain object-center rounded-lg group-hover/image:scale-105 transition-transform duration-350 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Hover effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-350 rounded-xl" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/image:translate-x-full transition-transform duration-490 ease-out rounded-xl overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Section - Right Side */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.56, 
            delay: index * 0.105 + 0.21, 
            ease: "easeOut" 
          }}
        >
          {/* Title */}
          <motion.h3 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#313E4E] leading-tight"
            whileHover={{ 
              scale: 1.02
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.div 
            className="prose prose-lg max-w-none"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <CustomPortableText
              value={description}
              paragraphClasses="text-[#313E4E]/80 leading-relaxed text-left"
            />
          </motion.div>

          {/* Decorative line */}
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-[#368DB1] to-[#B0DEE6] rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ 
              duration: 0.56, 
              delay: index * 0.105 + 0.35, 
              ease: "easeOut" 
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
