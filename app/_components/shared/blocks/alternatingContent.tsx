'use client';

import React, { useRef } from 'react';
import { cn } from '@/app/_utils';
import Image from 'next/image';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';
import { motion, useInView } from 'motion/react';

interface AlternatingContentProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    description?: string | undefined;
    buffers?: {
      top?: boolean | undefined;
      bottom?: boolean | undefined;
    };
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
        colour: 'light',
        buffers: {
          top: false,
          bottom: false,
        },
        maxWidth: true,
      }}
      className="py-16 md:py-40"
    >
      
      <div ref={containerRef} className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        <motion.div 
          className="mb-16 flex w-full flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {data.title}
          </motion.h2>
          {data.description && (
            <motion.p 
              className="max-w-4xl text-center text-lg md:text-xl text-[#313E4E] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {data.description}
            </motion.p>
          )}
        </motion.div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-20 md:gap-32">
          {data.content.map((item, i) => (
            <Card key={i} item={item} orientation={i % 2 ? 'rtl' : 'ltr'} index={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Card = ({
  item: { title, description, image },
  orientation = 'rtl',
  index = 0,
}: {
  item: AlternatingContentProps['data']['content'][0];
  orientation: 'rtl' | 'ltr';
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  const { asset } = image || {};
  const { url, metadata, altText } = image?.asset || {};
  const { dimensions } = metadata || {};

  const aspectRatio =
    dimensions?.width && dimensions?.height
      ? `${dimensions?.width! / 100}/${dimensions?.height! / 100}`
      : '8/7';

  return (
    <motion.div 
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2, 
        ease: "easeOut" 
      }}
    >
      <div className="grid grid-cols-1 grid-rows-2 place-items-center gap-12 md:grid-cols-2 md:grid-rows-1 md:gap-20">
        {/* Content Section */}
        <motion.div
          className={cn(
            'relative flex flex-col items-center justify-center gap-8 text-center md:items-start md:text-start p-8 md:p-12',
            orientation === 'rtl'
              ? 'md:col-start-1 md:row-start-1'
              : 'md:col-start-2 md:row-start-1'
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content wrapper */}
          <div className="relative z-10 space-y-6">
            <motion.h3 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313E4E] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#368DB1] group-hover:to-[#368DB1] group-hover:bg-clip-text transition-all duration-500"
              whileHover={{ x: orientation === 'rtl' ? -10 : 10 }}
            >
              {title}
            </motion.h3>
            
            <motion.div 
              className="prose prose-lg max-w-none"
              whileHover={{ x: orientation === 'rtl' ? -5 : 5 }}
              transition={{ duration: 0.3 }}
            >
              <CustomPortableText
                value={description}
                paragraphClasses={cn('text-[#313E4E]/80 leading-relaxed text-left')}
              />
            </motion.div>
          </div>

        </motion.div>

        {/* Image Section */}
        {asset && url && (
          <motion.div
            className={cn(
              'relative group/image',
              orientation === 'rtl'
                ? 'md:col-start-2 md:row-start-1'
                : 'md:col-start-1 md:row-start-1'
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Image container with enhanced styling */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl p-6">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/10 via-[#368DB1]/10 to-[#FFE48C]/10 rounded-2xl" />
              
              {/* Image */}
              <div className={`relative flex aspect-[${aspectRatio}] h-fit w-full items-center justify-center p-12`}>
                <Image
                  src={url || ''}
                  alt={altText || ''}
                  width={dimensions?.width || 0}
                  height={dimensions?.height || 0}
                  className="relative z-10 object-contain object-center group-hover/image:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 ease-out">
                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#B0DEE6]/20 to-transparent skew-x-12" />
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
