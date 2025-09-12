'use client';

import { cn } from '@/lib/utils';
import { Icon } from '@/app/_components/ui/icon';
import Image from 'next/image';
import React, { useRef } from 'react';
import Link from '@/app/_components/ui/link';
import { CTATitleImageProps } from '@/types/components/cta-title-image';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { motion, useInView } from 'motion/react';

export default function CTATitleImage({ data }: CTATitleImageProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="CTATitleImage"
      className={cn(
        'relative mx-auto flex w-full max-w-7xl auto-rows-min grid-cols-1 grid-rows-2 flex-col-reverse items-center justify-center gap-10 py-16 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-24 md:py-24'
      )}
    >
      {/* Content Section */}
      <motion.div 
        className="flex flex-col items-center justify-center gap-y-10 p-6 text-center md:items-start md:py-32 md:px-6 md:text-start"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="flex flex-col gap-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.span 
            className="text-sm uppercase font-semibold tracking-wider text-[#368DB1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {data.subtitle}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {data.title}
          </motion.h2>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <CustomPortableText 
            value={data.content} 
            paragraphClasses="text-lg md:text-xl text-[#313E4E]/80 leading-relaxed"
          />
          {data.points && (
            <motion.ul 
              className="flex flex-col items-start justify-start gap-y-4 text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {data.points.map((point, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start justify-start gap-x-4 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.7 + i * 0.1, 
                    ease: "easeOut" 
                  }}
                >
                  <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-gradient-to-br from-[#B0DEE6]/20 to-[#368DB1]/20">
                    <Icon
                      type={point.icon.type}
                      weight={point.icon.weight}
                      className="size-5 text-[#368DB1]"
                    />
                  </div>
                  <span className="text-lg font-medium text-[#313E4E]">
                    {point.content}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {data.buttons &&
            data.buttons.map((button, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.9 + i * 0.1, 
                  ease: "easeOut" 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  variant={button.type}
                  size="default"
                  link={button.link}
                  className="w-full sm:w-auto"
                >
                  {button.title}
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className="group relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl shadow-2xl mx-auto"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <Image
          src={data.image.asset?.url || ''}
          alt={data.image.asset?.altText || ''}
          width={data.image.asset?.metadata?.dimensions.width}
          height={data.image.asset?.metadata?.dimensions.height}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
        <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
        
        {/* Border accent */}
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#B0DEE6]/20 via-[#368DB1]/20 to-[#FFE48C]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </section>
  );
}
