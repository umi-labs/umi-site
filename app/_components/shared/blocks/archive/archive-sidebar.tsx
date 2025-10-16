'use client';
import React, { useRef } from 'react';
import { cn } from '@/app/_utils';
import { useQueryState } from 'nuqs';
import { motion, useInView } from 'motion/react';

interface Props {
  postType?: 'project' | 'post' | undefined;
  tags: string[];
  topTags: string[];
  otherTags: string[];
  types: string[];
  currentTag: string;
  currentType: string;
  setCurrentTag: (tag: string) => void;
  setCurrentType: (type: string) => void;
  isAccordionOpen: boolean;
  setIsAccordionOpen: (open: boolean) => void;
}

const tagFormatter = (tag: string) => {
  return tag?.toLowerCase().split(' ').join('-');
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function ArchiveSidebar({ 
  postType, 
  tags, 
  topTags,
  otherTags,
  types, 
  currentTag, 
  currentType, 
  setCurrentTag, 
  setCurrentType,
  isAccordionOpen,
  setIsAccordionOpen
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={containerRef}
      className="bg-white/90 backdrop-blur-sm border border-[#B0DEE6]/20 rounded-2xl p-6 sticky top-8 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.56, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-xl font-bold text-[#1a2332] mb-6 bg-gradient-to-r from-[#1a2332] to-[#2c5a73] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.42, delay: 0.14, ease: "easeOut" }}
      >
        Filters
      </motion.h3>
      

      {/* Tags Filter */}
      {topTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.42, delay: 0.21, ease: "easeOut" }}
        >
          <h4 className="text-sm font-semibold text-[#313E4E] mb-4">
            {postType === 'project' ? 'Filter by Technology' : 'Filter by Category'}
          </h4>
          <div className="space-y-2">
            {/* Top 5 Categories */}
            {topTags.map((tag, i) => (
              <motion.button
                key={i}
                className={cn(
                  'w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-300 font-medium',
                  currentTag === tagFormatter(tag)
                    ? 'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white shadow-lg'
                    : 'bg-gradient-to-r from-[#B0DEE6]/10 to-[#FFE48C]/10 text-[#313E4E] hover:from-[#B0DEE6]/20 hover:to-[#FFE48C]/20 hover:scale-105'
                )}
                onClick={() => {
                  setCurrentTag(tagFormatter(tag));
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: 0.28 + i * 0.035, ease: "easeOut" }}
              >
                {tag === 'all' ? 'All' : capitalizeFirstLetter(tag?.split('-').join(' '))}
              </motion.button>
            ))}
            
            {/* Accordion for Other Categories */}
            {otherTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.42, delay: 0.35, ease: "easeOut" }}
              >
                <motion.button
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#313E4E]/70 hover:text-[#313E4E] transition-colors duration-200 rounded-xl hover:bg-gradient-to-r hover:from-[#B0DEE6]/5 hover:to-[#FFE48C]/5"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="font-medium">Other Categories ({otherTags.length})</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isAccordionOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isAccordionOpen ? 'auto' : 0,
                    opacity: isAccordionOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-2 pl-4">
                    {otherTags.map((tag, i) => (
                      <motion.button
                        key={i}
                        className={cn(
                          'w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-300 font-medium',
                          currentTag === tagFormatter(tag)
                            ? 'bg-gradient-to-r from-[#368DB1] to-[#368DB1] text-white shadow-lg'
                            : 'bg-gradient-to-r from-[#B0DEE6]/10 to-[#FFE48C]/10 text-[#313E4E] hover:from-[#B0DEE6]/20 hover:to-[#FFE48C]/20 hover:scale-105'
                        )}
                        onClick={() => {
                          setCurrentTag(tagFormatter(tag));
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: 0.42 + i * 0.035, ease: "easeOut" }}
                      >
                        {capitalizeFirstLetter(tag?.split('-').join(' '))}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
