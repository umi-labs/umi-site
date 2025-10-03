'use client';
import React, { useRef } from 'react';
import type { Icon as IconType } from '@/types/generics';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { Icon } from '@/app/_components/ui/icon';
import Container from '@/app/_components/ui/container';
import { motion, useInView } from 'motion/react';
import { cn } from '@/app/_utils';

interface Props {
  data: {
    separator?: boolean | undefined;
    subtitle: string;
    title: string;
    description?: string | undefined;
    features: {
      title: string;
      description: string;
      icon?: IconType;
    }[];
  };
}

export default function FeatureGrid({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Container 
      id="FeatureGrid"
      options={{
        colour: 'light',
        maxWidth: true,
      }}
      className="bg-transparent py-16 md:py-24"
    >
      <div ref={containerRef} className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        <motion.div 
          className="mb-16 flex w-full flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
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
        <motion.div 
          className="grid w-full grid-cols-1 grid-rows-2 items-center justify-center gap-8 md:grid-cols-2 md:grid-rows-1 lg:grid-flow-row lg:grid-cols-3"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {data.features.map((feature, i) => (
            <Feature key={i} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </Container>
  );
}

const Feature = ({ feature, index = 0 }: { feature: Props['data']['features'][0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={cardRef}
      className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0.3, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 20, scale: 0.95 }}
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
      <div className="relative z-10 flex h-full w-full items-center gap-6 p-8">
        {/* Icon section */}
        <motion.div 
          className="relative flex items-center justify-center p-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Enhanced icon background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#B0DEE6]/20 to-[#368DB1]/20 group-hover:from-[#368DB1]/30 group-hover:to-[#B0DEE6]/30 transition-all duration-500" />
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-200" />
          
          {feature.icon && (
            <Icon
              type={feature.icon.type}
              weight={feature.icon.weight}
              className="relative z-10 size-12 text-[#313E4E] group-hover:text-[#368DB1] transition-colors duration-500"
            />
          )}
        </motion.div>

        {/* Text content */}
        <motion.div 
          className="flex flex-1 flex-col gap-4"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h4 
            className="text-xl font-bold text-[#313E4E] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#368DB1] group-hover:to-[#368DB1] group-hover:bg-clip-text transition-all duration-500"
            whileHover={{ scale: 1.02 }}
          >
            {feature.title}
          </motion.h4>
          <motion.p 
            className="text-sm text-[#313E4E]/80 leading-relaxed group-hover:text-[#313E4E] transition-colors duration-500"
            whileHover={{ scale: 1.01 }}
          >
            {feature.description}
          </motion.p>
        </motion.div>
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

const IconBackground = (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="151"
      height="142"
      viewBox="0 0 151 142"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B0DEE6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#368DB1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFE48C" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M20.9928 105.784C-32.8563 71.2947 33.3992 40.9578 60.3237 19.2866C125.801 -39.3381 167.164 54.3381 144.014 110.364C122.395 166.618 54.8596 133.911 20.9928 105.77"
        fill="url(#iconGradient)"
        className="group-hover:opacity-100 opacity-60 transition-opacity duration-500"
      />
    </svg>
  );
};
