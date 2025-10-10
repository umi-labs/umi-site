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
      className="w-full py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-24">
          
          {/* Content Section */}
          <motion.div 
            className="flex flex-col justify-center space-y-8 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.56, ease: "easeOut" }}
          >
            
            {/* Header */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.56, delay: 0.14, ease: "easeOut" }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-[#368DB1]">
                {data.subtitle}
              </span>
              <h2 className="text-4xl font-light leading-[1.2] text-[#1a2332] md:text-5xl lg:text-6xl">
                {data.title}
              </h2>
            </motion.div>

            {/* Content */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.56, delay: 0.21, ease: "easeOut" }}
            >
              <CustomPortableText 
                value={data.content} 
                paragraphClasses="text-lg text-[#313E4E]/80 leading-relaxed md:text-xl"
              />
              
              {/* Points List */}
              {data.points && data.points.length > 0 && (
                <ul className="space-y-4 text-center md:text-left">
                  {data.points.map((point, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-4 justify-center md:justify-start"
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ duration: 0.42, delay: 0.28 + i * 0.07, ease: "easeOut" }}
                    >
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
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Buttons */}
            {data.buttons && data.buttons.length > 0 && (
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.56, delay: 0.35, ease: "easeOut" }}
              >
                {data.buttons.map((button, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
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
            )}
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className="relative h-80 w-80 overflow-hidden rounded-2xl shadow-2xl group sm:h-96 sm:w-96"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {data.image?.asset?.url ? (
                <Image
                  src={data.image.asset.url}
                  alt={data.image.asset.altText || data.title || 'CTA Image'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#B0DEE6]/20 to-[#368DB1]/20">
                  <span className="text-lg font-medium text-[#313E4E]/60">
                    No image available
                  </span>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#313E4E]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
