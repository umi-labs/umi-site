'use client';

import { cn } from '@/lib/utils';
import { Icon } from '@/app/_components/ui/icon';
import React, { useRef } from 'react';
import Link from '@/app/_components/ui/link';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { motion, useInView } from 'motion/react';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/Component';

interface RequestQuotationProps {
  data: {
    separator?: boolean;
    subtitle?: string;
    title?: string;
    content?: any[];
    points?: Array<{
      icon: {
        type: 'eye' | 'rocket' | 'clock' | 'headphones' | 'check' | 'check-circle' | 'facebook' | 'twitter' | 'instagram' | 'linkedin';
        weight: 'fill' | 'bold' | 'light' | 'thin' | 'regular' | 'duotone';
      };
      content: string;
    }>;
    form?: {
      _id: string;
      title: string;
      formFields: any[];
      email: string;
      subject: string;
      submitButtonLabel: string;
      confirmationMessage: any[];
      confirmationType: 'message' | 'redirect';
      redirect: string;
      _key: string;
      fields: any[];
      uid: string;
    };
    buttons?: Array<{
      title: string;
      type: 'link' | 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link-external' | 'link-interactive' | 'link-light' | 'gradient' | 'bounce' | 'glow' | 'shimmer' | 'pulse';
      link: {
        title: string;
        displayExternal: boolean;
        internalLink?: any;
        externalUrl?: string;
        _key: string;
        slug: string;
        hasParent: boolean;
        type: string;
      };
    }>;
    testimonial?: {
      author?: {
        _id: string;
        name: string;
        role?: string;
        image?: {
          asset?: {
            url: string;
          };
        };
      };
      quote?: string;
    };
  };
}

export default function RequestQuotation({ data }: RequestQuotationProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="RequestQuotation"
      className="relative mx-auto flex w-full max-w-7xl auto-rows-min grid-cols-1 grid-rows-2 flex-col-reverse items-center justify-center gap-10 py-16 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-24 md:py-24"
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
          {data.subtitle && (
            <motion.span 
              className="text-sm uppercase font-semibold tracking-wider text-[#368DB1]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {data.subtitle}
            </motion.span>
          )}
          {data.title && (
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {data.title}
            </motion.h2>
          )}
        </motion.div>

        <motion.div 
          className="flex flex-col gap-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {data.content && (
            <CustomPortableText 
              value={data.content} 
              paragraphClasses="text-lg md:text-xl text-[#313E4E]/80 leading-relaxed"
            />
          )}
          {data.points && data.points.length > 0 && (
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
          
          {/* Testimonial Section */}
          {data.testimonial && data.testimonial.quote && (
            <motion.div 
              className="relative flex flex-col items-start justify-start gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4">
                {data.testimonial.author?.image?.asset?.url && (
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                  >
                    <img
                      src={data.testimonial.author.image.asset.url}
                      alt={data.testimonial.author.name || 'Author'}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  </motion.div>
                )}
                <div className="flex flex-col">
                  <motion.span 
                    className="text-sm font-semibold text-[#313E4E]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                  >
                    {data.testimonial.author?.name || 'Anonymous'}
                  </motion.span>
                  {data.testimonial.author?.role && (
                    <motion.span 
                      className="text-xs text-[#313E4E]/70 font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                    >
                      {data.testimonial.author.role}
                    </motion.span>
                  )}
                </div>
              </div>
              <motion.blockquote 
                className="text-lg italic text-[#313E4E]/90 leading-relaxed relative pl-8 pr-8"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              >
                <div className="absolute -top-1 -left-1 text-6xl text-[#368DB1]/20 font-serif leading-none">"</div>
                <div className="relative z-10">{data.testimonial.quote}</div>
                <div className="absolute -bottom-2 -right-1 text-6xl text-[#368DB1]/20 font-serif leading-none">"</div>
              </motion.blockquote>
            </motion.div>
          )}
        </motion.div>

        {data.buttons && data.buttons.length > 0 && (
          <motion.div 
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            {data.buttons.map((button, i) => (
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
        )}
      </motion.div>

      {/* Form Section */}
      <motion.div 
        className="relative flex w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl mx-auto p-8"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        {data.form ? (
          <div className="w-full">
            <motion.h3 
              className="text-2xl font-semibold text-[#313E4E] mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              {data.form.title}
            </motion.h3>
            <FormBuilderBlock form={data.form} uid={data.form.uid} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-[#313E4E]/60">
            <p>No form selected</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
