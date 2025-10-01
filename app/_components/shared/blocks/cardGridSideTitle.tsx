'use client';
import React, { useRef } from 'react';

import Link from '@/app/_components/ui/link';
import { cn } from '@/app/_utils';
import type { Button, Icon as IconType } from '@/types/generics';
import { Icon } from '@/app/_components/ui/icon';
import { EyebrowSVG, IconBackground } from '@/app/_components/ui/svg-comps';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';
import { motion, useInView } from 'motion/react';

interface CardGridSideTitleProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    content: PortableTextBlock[];
    buttons?: Button[] | undefined;
    topBuffer?: boolean | undefined;
    features: {
      icon?: IconType | undefined;
      title: string;
      content?: string | undefined;
      button?: Button | undefined;
    }[];
  };
}

export default function CardGridSideTitle({ data }: CardGridSideTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Container
      id="CardGridSideTitle"
      options={{
        colour: 'transparent',
        buffers: {
          top: false,
        },
        maxWidth: true,
      }}
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div ref={containerRef} className="relative z-10 flex w-full flex-col items-center justify-center mx-auto max-w-7xl gap-16 px-6 text-center md:grid md:grid-cols-3 md:grid-rows-1 md:gap-20 md:px-10">
        <motion.div 
          className="relative flex h-fit w-full grid-flow-row-dense flex-col items-center justify-center gap-y-12 place-self-start text-center md:items-start md:justify-start md:text-start"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
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
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] bg-gradient-to-r from-[#1a2332] via-[#368DB1] to-[#1a2332] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {data.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <CustomPortableText 
              value={data.content} 
              paragraphClasses="text-lg md:text-xl text-[#313E4E]/90 leading-relaxed" 
            />
          </motion.div>
          <motion.div 
            className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {data?.buttons?.map((button, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
              >
                <Link
                  link={button.link}
                  size="default"
                  variant={button.type}
                  className="w-full lg:w-auto"
                >
                  {button.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className={cn(
            'col-span-2 grid w-full grid-flow-row items-center justify-center gap-12 md:grid-cols-2 lg:grid-cols-3'
          )}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          {data.features.map((feature, i) => (
            <Card key={i} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </Container>
  );
}

const Card = ({
  feature,
  index,
}: {
  feature: CardGridSideTitleProps['data']['features'][0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      id={`card_${index}`}
      className={cn(
        'group relative h-full w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20',
        feature.icon ? 'justify-between' : 'justify-center'
      )}
      initial={{ opacity: 0.8, y: 10, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.8, y: 10, scale: 0.98 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: "easeOut" 
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/5 via-[#368DB1]/5 to-[#FFE48C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center gap-y-4 p-6">
        {feature.icon && (
          <motion.div 
            className="relative flex items-center justify-center p-10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Enhanced icon background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#B0DEE6]/20 to-[#368DB1]/20 group-hover:from-[#368DB1]/30 group-hover:to-[#B0DEE6]/30 transition-all duration-500" />
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
            
            <IconBackground className={cn(`absolute inset-0 z-0 size-full`)} />
            <Icon
              type={feature.icon.type}
              weight={feature.icon.weight}
              className="relative z-10 size-10 text-[#368DB1] group-hover:text-[#B0DEE6] transition-colors duration-500"
            />
          </motion.div>
        )}
        
        <motion.h3 
          className="mb-0 text-xl font-bold text-[#1a2332] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#368DB1] group-hover:to-[#B0DEE6] group-hover:bg-clip-text transition-all duration-500 leading-[1.2]"
          whileHover={{ scale: 1.02 }}
        >
          {feature.title}
        </motion.h3>
        
        {feature.content && (
          <motion.p 
            className="text-sm text-[#313E4E]/90 leading-relaxed group-hover:text-[#1a2332] transition-colors duration-500"
            whileHover={{ scale: 1.01 }}
          >
            {feature.content}
          </motion.p>
        )}
        
        {feature.button && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              link={feature.button.link}
              variant={feature.button.type}
              className="w-full uppercase text-[#368DB1] hover:font-bold hover:text-[#B0DEE6] md:w-fit transition-all duration-300"
            >
              {feature.button.title}
            </Link>
          </motion.div>
        )}
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      </div>

      {/* Border accent */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#B0DEE6]/20 via-[#368DB1]/20 to-[#FFE48C]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};
