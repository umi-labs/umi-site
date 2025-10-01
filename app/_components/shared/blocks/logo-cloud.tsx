'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import type { Image as ImageType } from '@/types/generics';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { getLogos, LogosPayload } from '@/app/_actions/logos';
import { useQuery } from '@tanstack/react-query';
import Container from '@/app/_components/ui/container';
import Link from '@/app/_components/ui/link';
import { motion, useInView } from 'motion/react';
import { cn } from '@/app/_utils';

interface LogoCloudProps {
  data: {
    separator?: boolean;
    title: string;
    manual?: boolean;
    logos: LogosPayload[];
  };
}

export default function LogoCloud({ data }: LogoCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [logos, setLogos] = React.useState<LogosPayload[]>([]);

  React.useEffect(() => {
    if (data.manual === false) return;
    setLogos(data.logos);
  }, [data]);

  const { data: logosArray } = useQuery({
    queryKey: ['logos', logos],
    queryFn: () => getLogos(),
  });

  React.useEffect(() => {
    if (!logosArray) return;
    if (!data.manual) {
      setLogos(logosArray!);
    }
  }, [logosArray]);

  return (
    <Container
      id="LogoCloud"
      options={{
        colour: 'light',
        buffers: {
          top: false,
          bottom: false,
        },
        maxWidth: true,
      }}
      className="gap-y-16 py-20 md:py-32 bg-transparent"
    >
      <div ref={containerRef} className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        <motion.div 
          className="mb-16 flex w-full flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {data.separator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <EyebrowSVG className="" />
            </motion.div>
          )}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            {data.title}
          </motion.h2>
        </motion.div>
        {logos && logos.length > 0 && (
          <motion.div 
            className="grid w-full grid-cols-2 place-items-center items-center justify-center gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {logos.map((logo, i) => (
              <Logo key={i} logo={logo} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </Container>
  );
}

const Logo = ({ logo, index = 0 }: { logo: LogoCloudProps['data']['logos'][0]; index: number }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(logoRef, { once: true, margin: "-50px" });

  if (!logo?.logo?.asset?.url) {
    return null;
  }

  const imageUrl = logo.logo.asset.url;
  const altText = logo.logo.asset.originalFilename || 'Logo';
  const width = logo.logo.asset.metadata?.dimensions?.width || 150;
  const height = logo.logo.asset.metadata?.dimensions?.height || 150;

  const logoContent = (
    <motion.div 
      ref={logoRef}
      className="group relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0.6, y: 8, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.6, y: 8, scale: 0.98 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05, 
        ease: "easeOut" 
      }}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/5 via-[#368DB1]/5 to-[#FFE48C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-[#FFE48C] to-[#ECCD7F] rounded-full opacity-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300 delay-50" />
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-[#B0DEE6] to-[#368DB1] rounded-full opacity-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300 delay-100" />
      
      {/* Logo image */}
      <motion.div
        className="relative z-10 flex items-center justify-center p-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Image
          src={imageUrl}
          alt={altText}
          width={width}
          height={height}
          className="max-h-20 w-auto object-contain object-center filter grayscale group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
      </motion.div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </div>

      {/* Border accent */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#B0DEE6]/10 via-[#368DB1]/10 to-[#FFE48C]/10 bg-clip-border opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
    </motion.div>
  );

  return logo.link?.url ? (
    <Link 
      href={logo.link.url} 
      className="block h-full w-full"
      target="_blank"
      rel="noopener noreferrer"
    >
      {logoContent}
    </Link>
  ) : (
    logoContent
  );
};
