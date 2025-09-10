'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostPayload, ProjectPayload } from '@/types';
import { cn } from '@/app/_utils';
import { buttonVariants } from '@/app/_components/ui/button';
import { format, parseISO } from 'date-fns';
import { motion } from 'motion/react';

type PostProps = { archive: PostPayload; postType: 'post' | undefined };
type ProjectProps = {
  archive: ProjectPayload;
  postType: 'project' | undefined;
};

type Props = {
  index?: number;
} & (ProjectProps | PostProps);

export default function StandardArchiveCard(props: Props) {
  const [date, setDate] = useState<string>();

  React.useEffect(() => {
    if (props.postType !== 'post') return;
    const date = parseISO(props.archive._updatedAt!); // Converts the ISO string to a Date object
    const formattedDate = format(date, 'MMM d, yyyy'); // Formats the date
    setDate(formattedDate);
  }, [props.archive]);

  const slug = `/our-work/${props.archive.slug || ''}`;

  if (props.postType === 'post') {
    return <PostCard archive={props.archive} index={props.index} />;
  }

  return (
    <motion.div
      aria-label={`archive-card-${props.archive.title?.toLowerCase() || ''}`}
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-48 md:h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.1 * props.index!,
      }}
    >
      <Link href={slug} className="block h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          {props.archive.coverImage?.asset?.url && (
            <Image
              src={props.archive.coverImage?.asset?.url || ''}
              alt={props.archive.coverImage?.asset?.altText || ''}
              width={props.archive.coverImage?.asset?.metadata?.dimensions.width}
              height={props.archive.coverImage?.asset?.metadata?.dimensions.height}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-1 line-clamp-2">
            {props.archive.title}
          </h3>

          {/* Excerpt */}
          {props.archive.excerpt && (
            <p className="text-gray-200 text-xs line-clamp-1 mb-2">
              {props.archive.excerpt}
            </p>
          )}

          {/* Tags */}
          {props.archive.tags && props.archive.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {props.archive.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full uppercase border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More Link */}
          <div className="flex items-center justify-between">
            <span className="text-white font-medium text-xs">
              View Project
            </span>
            <div className="w-6 h-6 bg-primary-accent rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary-accent transition-all duration-300">
              <svg 
                className="w-3 h-3 text-white group-hover:text-primary-accent transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface PostCardProps {
  index?: number;
  archive: PostPayload;
}

export function PostCard({ archive, index }: PostCardProps) {
  const date = parseISO(archive._updatedAt!); // Converts the ISO string to a Date object
  const formattedDate = format(date, 'MMM d, yyyy'); // Formats the date
  return (
    <motion.div
      id='post-card'
      className="group relative bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.1 * index!,
      }}
    >
      <Link href={`/blog/${archive.slug}`} className="block h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[3/2] md:aspect-[4/3] overflow-hidden flex-shrink-0">
          <Image
            id='post-card__image'
            src={archive.coverImage?.asset?.url || ''}
            alt={archive.coverImage?.asset?.altText || ''}
            width={archive.coverImage?.asset?.metadata?.dimensions.width}
            height={archive.coverImage?.asset?.metadata?.dimensions.height}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Date Tag */}
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-black/60 backdrop-blur-sm rounded-full">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-accent transition-colors mb-1 line-clamp-2">
            {archive.title}
          </h3>

          {/* Author */}
          {archive.author && (
            <div className="mb-1">
              <Link 
                id='post-card__author-link' 
                href={archive.author.slug} 
                className="text-xs text-gray-600 hover:text-primary-accent transition-colors"
              >
                By {archive.author.name}
              </Link>
            </div>
          )}


          {/* Read More Link */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-primary-accent font-medium text-xs group-hover:text-primary-accent/80 transition-colors">
              Read More
            </span>
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-primary-accent transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedArchiveCard(props: Props) {
  return (
    <div
      aria-label={`featured-archive-card-${props.archive.title?.toLowerCase() || ''}`}
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
    >
      <Link 
        href={`/${props.postType === 'post' ? 'blog' : 'our-work'}/${props.archive.slug || ''}`} 
        className="block h-full"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={props.archive.coverImage?.asset?.url || ''}
            alt={props.archive.coverImage?.asset?.altText || ''}
            width={props.archive.coverImage?.asset?.metadata?.dimensions.width}
            height={props.archive.coverImage?.asset?.metadata?.dimensions.height}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        </div>


        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4 lg:p-6">
          {/* Title */}
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2">
            {props.archive.title}
          </h2>

          {/* Excerpt */}
          {props.archive.excerpt && (
            <p className="text-gray-200 text-xs line-clamp-1 mb-3 max-w-2xl">
              {props.archive.excerpt}
            </p>
          )}

          {/* Tags */}
          {props.postType === 'project' && props.archive.tags && props.archive.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {props.archive.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block px-2 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full uppercase border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-xs">
                {props.postType === 'post' ? 'Read Article' : 'View Project'}
              </span>
              <div className="w-8 h-8 bg-primary-accent flex items-center justify-center group-hover:bg-white group-hover:text-primary-accent transition-all duration-300">
                <svg 
                  className="w-4 h-4 text-white group-hover:text-primary-accent transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
      </Link>
    </div>
  );
}
