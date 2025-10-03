'use client';
import React, { useRef } from 'react';
import type { Button } from '@/types/generics';
import {
  Slider,
  SliderContent,
  SliderIndicators,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from '@/app/_components/ui/slider';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { getFeaturedProjects } from '@/app/_actions/projects';
import { useQuery } from '@tanstack/react-query';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';
import { Link as CustomLink } from '@/app/_components/ui/link';
import StandardArchiveCard from '@/app/_components/ui/card/archive-card';
import { motion, useInView } from 'motion/react';

interface PortfolioFullWidthProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    content?: PortableTextBlock[];
    buttons?: Button[] | undefined;
  };
}

export default function PortfolioFullWidth({ data }: PortfolioFullWidthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getFeaturedProjects(),
  });

  return (
    <Container
      id="PortfolioFullWidth"
      options={{
        colour: 'transparent',
        maxWidth: true,
      }}
      className="relative overflow-hidden py-20 md:py-24"
    >

      <div ref={containerRef} className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 px-6 text-center lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-20 lg:px-10">
        <motion.div 
          className="flex h-fit w-full flex-col items-center justify-center gap-y-12 place-self-start text-center lg:items-start lg:justify-start lg:text-start"
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
          {data.content && (
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
          )}
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
                <CustomLink
                  link={button.link}
                  size="default"
                  variant={button.type}
                  className="w-full lg:w-auto"
                >
                  {button.title}
                </CustomLink>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {projects && (
          <motion.div
            className="col-span-2 w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            {/* Desktop: Show multiple cards in a grid */}
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects?.slice(0, 6).map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <StandardArchiveCard
                    archive={project}
                    index={i}
                    postType="project"
                  />
                </motion.div>
              ))}
            </div>

            {/* Mobile/Tablet: Use slider */}
            <div className="lg:hidden">
              <Slider
                opts={{
                  loop: true,
                  align: "start",
                  slidesToScroll: 1,
                }}
                className="relative w-full"
              >
                <SliderContent className="-ml-4">
                  {projects?.map((project, i) => (
                    <SliderItem
                      key={i}
                      className="relative ml-4"
                    >
                      <StandardArchiveCard
                        archive={project}
                        index={i}
                        postType="project"
                      />
                    </SliderItem>
                  ))}
                </SliderContent>
                <SliderIndicators className="space-x-8" />
                <div className="absolute -bottom-12 left-6 flex items-center justify-center gap-4">
                  <SliderPrevious className="size-10 border border-[#B0DEE6]/30 bg-white/80 hover:bg-[#B0DEE6]/10 hover:border-[#368DB1]/50 transition-all duration-300" />
                  <SliderNext className="size-10 border border-[#B0DEE6]/30 bg-white/80 hover:bg-[#B0DEE6]/10 hover:border-[#368DB1]/50 transition-all duration-300" />
                </div>
              </Slider>
            </div>
          </motion.div>
        )}
      </div>
    </Container>
  );
}
