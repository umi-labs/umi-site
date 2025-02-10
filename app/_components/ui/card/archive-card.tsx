'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from '@/app/_components/ui/link';
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
      className="flex-center relative aspect-square size-full"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.5 * props.index!,
      }}
    >
      {props.archive.coverImage?.asset?.url && (
        <Image
          src={props.archive.coverImage?.asset?.url || ''}
          alt={props.archive.coverImage?.asset?.altText || ''}
          width={props.archive.coverImage?.asset?.metadata?.dimensions.width}
          height={props.archive.coverImage?.asset?.metadata?.dimensions.height}
          className="absolute inset-0 -z-0 aspect-square size-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 z-[1] h-full w-full bg-gradient-to-b from-black/20 to-black/40" />
      <div className="z-10 flex flex-col items-center justify-center gap-y-6">
        <h2 className="text-2xl font-semibold text-primary-background hocus:no-underline">
          {props.archive.title}
        </h2>
        <Link
          variant="link-light"
          className="text-lg text-gray-200 hocus:text-gray-100"
          href={slug}
        >
          Read More
        </Link>
      </div>
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
      className="grid size-full grid-flow-row auto-rows-auto place-items-center gap-x-10 shadow-[0px_3px_8px_-1px_rgba(0,0,0,0.10)] lg:grid-cols-1 lg:grid-rows-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.5 * index!,
      }}
    >
      <Image
        src={archive.coverImage?.asset?.url || ''}
        alt={archive.coverImage?.asset?.altText || ''}
        width={archive.coverImage?.asset?.metadata?.dimensions.width}
        height={archive.coverImage?.asset?.metadata?.dimensions.height}
        className="aspect-video h-full object-cover object-center"
      />
      <div className="flex w-full flex-col items-start justify-around gap-y-8 px-6 py-6 lg:size-full">
        <div className="flex size-full flex-col items-start justify-center gap-y-3 lg:justify-between">
          <div className="flex w-full items-center justify-between">
            <h6 className="text-xs uppercase text-[#368DB1]">
              <span className="font-semibold">{archive.type}</span>
            </h6>
            <span className="text-xs uppercase text-gray-600">
              {formattedDate && formattedDate}
            </span>
          </div>
          <h3 className="font-light">{archive.title}</h3>
          <div className="flex w-full items-center justify-between">
            {archive.author && (
              <Link href={archive.author.slug} className="text-gray-300">
                By&nbsp;
                <span className="text-black">{archive.author.name}</span>
              </Link>
            )}
          </div>
          <p className="text-sm text-gray-600">{archive.excerpt}</p>
        </div>
        <div>
          <Link
            className={cn(
              buttonVariants({ variant: 'default', size: 'default' })
            )}
            href={`/blog/${archive.slug}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedArchiveCard(props: Props) {
  return (
    <div
      aria-label={`archive-card-${props.archive.title?.toLowerCase() || ''}`}
      className="flex-center group grid size-full grid-flow-row-dense lg:grid-cols-3 lg:grid-rows-1"
    >
      {/* Cover Image */}
      <div
        className={cn(
          'relative row-span-1 flex h-auto w-full overflow-visible lg:col-span-2 lg:aspect-video',
          props.index! % 2 === 1 && 'lg:col-start-2 lg:row-start-1'
        )}
      >
        <Image
          src={props.archive.coverImage?.asset?.url || ''}
          alt={props.archive.coverImage?.asset?.altText || ''}
          width={props.archive.coverImage?.asset?.metadata?.dimensions.width}
          height={props.archive.coverImage?.asset?.metadata?.dimensions.height}
          className={cn(
            '-z-0 h-full w-auto object-cover object-center lg:absolute lg:aspect-video lg:h-auto lg:min-h-64 lg:w-[120%] lg:min-w-64',
            props.index! % 2 === 1
              ? 'lg:inset-y-0 lg:right-0 lg:-translate-x-20 lg:translate-y-0'
              : 'lg:inset-y-0 lg:left-0 lg:translate-x-20 lg:translate-y-0'
          )}
        />
      </div>

      {/* Card */}
      <div
        className={cn(
          'relative row-span-1 flex h-full w-[-webkit-fill-available] lg:col-span-1 lg:w-auto'
        )}
      >
        <div
          className={cn(
            'z-10 my-auto flex h-fit flex-col items-start justify-start gap-y-6 bg-primary-background p-10 text-left shadow-[0px_3px_8px_-1px_rgba(0,0,0,0.10)] lg:absolute',
            props.index! % 2 === 1
              ? 'lg:inset-y-0 lg:left-0 lg:translate-x-20 lg:translate-y-0'
              : 'lg:inset-y-0 lg:right-0 lg:-translate-x-20 lg:translate-y-0'
          )}
        >
          <h2 className="text-2xl font-semibold text-primary-foreground hocus:no-underline">
            {props.archive.title}
          </h2>
          <p className="text-sm text-gray-800">{props.archive.excerpt}</p>
          <Link
            variant="link-light"
            className="text-lg text-primary-accent hocus:text-primary-accent"
            href={`/${props.postType === 'post' ? 'blog' : 'our-work'}/${props.archive.slug || ''}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
