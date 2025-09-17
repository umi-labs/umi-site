'use client';
import React, { useRef } from 'react';
import type {
  Image as ImageType,
  Layout,
  Link as LinkType,
} from '@/types/generics';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';
import Video, { VideoProps } from '@/app/_components/ui/video';
import { cn } from '@/app/_utils';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { PortableTextBlock } from 'next-sanity';
import Container from '@/app/_components/ui/container';
import { motion, useInView } from 'motion/react';

interface ContentBlockProps {
  data: {
    title: string;

    description: PortableTextBlock[];
    type: 'umiCulture' | 'standardVideo' | 'standardImage';
    imageGrid: ImageType[];
    cardGrid: {
      image: ImageType;
      title: string;
      description: string;
      link: LinkType;
    }[];
    video?: VideoProps;
    image?: ImageType;
  };
}

export default function ContentBlock({ data }: ContentBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Container 
      id="ContentBlock"
      options={{
        colour: 'transparent',
        maxWidth: false,
      }}
    >
      <div ref={containerRef} className="flex w-full flex-col gap-6">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {data.title}
        </motion.h2>
      </div>
      {data.type === 'umiCulture' && (
        <motion.div 
          className="grid w-full grid-flow-row-dense items-center justify-center gap-9 md:grid-cols-4 md:grid-rows-2"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {data.imageGrid.map((item, i) => (
            <motion.div
              key={i}
              className="group relative flex size-full items-center justify-center gap-y-6 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 md:first-of-type:col-span-2 md:first-of-type:row-span-2"
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + i * 0.1, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4
              }}
            >
              {item && (
                <>
                  <Image
                    src={item.asset?.url || ''}
                    alt={item.asset?.altText || ''}
                    width={item.asset?.metadata?.dimensions.width}
                    height={item.asset?.metadata?.dimensions.height}
                    className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                    <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
      {data.type === 'standardVideo' && data.video && (
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Video {...data.video} />
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
              <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </div>
          </div>
        </motion.div>
      )}
      {data.type === 'standardImage' && data.image && (
        <motion.div 
          className="group relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={data.image.asset?.url || ''}
            alt={data.image.asset?.altText || ''}
            width={data.image.asset?.metadata?.dimensions.width}
            height={data.image.asset?.metadata?.dimensions.height}
            className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
            <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <CustomPortableText 
          value={data.description} 
          paragraphClasses="text-lg md:text-xl text-[#313E4E]/80 leading-relaxed"
        />
      </motion.div>
      
      {data.type === 'umiCulture' && (
        <motion.div 
          className="grid w-full grid-flow-row grid-cols-1 items-center justify-center gap-9 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {data.cardGrid.map((item, i) => (
            <motion.div
              key={i}
              className="group relative flex flex-col items-center justify-center gap-y-6 overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm text-center shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0.3, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 20, scale: 0.95 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5 + i * 0.15, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.05,
                y: -8
              }}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/5 via-[#368DB1]/5 to-[#FFE48C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex size-full flex-col items-center justify-between gap-y-6 p-12 xl:px-20 xl:py-24">
                <motion.div 
                  className="relative flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src={item.image?.asset?.url || ''}
                    alt={item.image?.asset?.altText || ''}
                    width={item.image?.asset?.metadata?.dimensions.width}
                    height={item.image?.asset?.metadata?.dimensions.height}
                    className="size-24 overflow-clip rounded-full object-cover object-center shadow-lg transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
                </motion.div>
                
                <div className="flex flex-col gap-y-3">
                  <motion.h3 
                    className="text-xl font-bold text-[#313E4E] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#368DB1] group-hover:to-[#368DB1] group-hover:bg-clip-text transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.span 
                    className="text-[#313E4E]/80 group-hover:text-[#313E4E] transition-colors duration-500"
                    whileHover={{ scale: 1.01 }}
                  >
                    {item.description}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="flex gap-x-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    variant="link"
                    size="link"
                    /* @ts-ignore */
                    href={item}
                    className="text-lg uppercase text-[#368DB1] transition-all duration-300 ease-in-out hover:font-bold hover:text-[#368DB1] hover:underline"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </div>

              {/* Border accent */}
              <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#B0DEE6]/20 via-[#368DB1]/20 to-[#FFE48C]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  );
}

