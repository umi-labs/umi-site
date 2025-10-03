'use client';
import React, { useRef } from 'react';
import { cn } from '@/app/_utils';
import { useQueryState } from 'nuqs';
import { motion, useInView } from 'motion/react';

interface Props {
  postType?: 'project' | 'post' | undefined;
  tags: string[];
  types: string[];
  currentTag: string;
  currentType: string;
  setCurrentTag: (tag: string) => void;
  setCurrentType: (type: string) => void;
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
  types, 
  currentTag, 
  currentType, 
  setCurrentTag, 
  setCurrentType 
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={containerRef}
      className="bg-white/90 backdrop-blur-sm border border-[#B0DEE6]/20 rounded-2xl p-6 sticky top-8 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-xl font-bold text-[#1a2332] mb-6 bg-gradient-to-r from-[#1a2332] to-[#2c5a73] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        Filters
      </motion.h3>
      

      {/* Tags Filter */}
      {tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <h4 className="text-sm font-semibold text-[#313E4E] mb-4">
            {postType === 'project' ? 'Filter by Technology' : 'Filter by Category'}
          </h4>
          <div className="space-y-2">
            {tags.map((tag, i) => (
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
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease: "easeOut" }}
              >
                {tag === 'all' ? 'All' : capitalizeFirstLetter(tag?.split('-').join(' '))}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
