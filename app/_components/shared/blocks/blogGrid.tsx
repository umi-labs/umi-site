'use client';
import React from 'react';
import { Icon } from '@/app/_components/ui/icon';
import Link from 'next/link';
import Image from 'next/image';
import type { Image as ImageType } from '@/types/generics';
import { getRecentPosts } from '@/app/_actions/recentPosts';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/app/_components/ui/button';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { useQuery } from '@tanstack/react-query';

interface BlogGridProps {
  data: {
    separator?: boolean;
    title: string;
    blogs: {
      tags: string[];
      title: string;
      coverImage: ImageType;
      slug: string;
      author?:
        | {
            name: string;
            slug: string;
          }
        | undefined;
      time?:
        | {
            timeTaken?: number | undefined;
            timeType?: ('blog' | 'podcast') | undefined;
          }
        | undefined;
      _updatedAt: string;
    }[];
  };
}

export default function BlogGrid({ data }: BlogGridProps) {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getRecentPosts(),
  });

  return (
    <section className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-14 px-10 py-10 md:py-32">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-2 items-center justify-center gap-9 md:grid-cols-2 md:grid-rows-1">
        {posts?.map((blog, i) => <PostCard {...blog} key={i} />)}
      </div>
    </section>
  );
}

const PostCard = (props: BlogGridProps['data']['blogs'][0]) => {
  const date = parseISO(props._updatedAt); // Converts the ISO string to a Date object
  const formattedDate = format(date, 'MMM d, yyyy'); // Formats the date

  return (
    <div className="grid size-full grid-flow-row auto-rows-auto place-items-center gap-x-10 shadow-[0px_3px_8px_-1px_rgba(0,0,0,0.10)] lg:grid-cols-2 lg:grid-rows-1">
      <Image
        src={props.coverImage?.asset?.url || ''}
        alt={props.coverImage?.asset?.altText || ''}
        width={props.coverImage?.asset?.metadata?.dimensions.width}
        height={props.coverImage?.asset?.metadata?.dimensions.height}
        className="h-full object-cover object-center"
      />
      <div className="flex w-full flex-col items-start justify-around gap-y-8 px-6 py-6 lg:size-full lg:pl-0">
        <div className="flex size-full flex-col items-start justify-center gap-y-3 lg:justify-between">
          <div className="flex w-full items-center justify-between">
            <h6 className="text-xs uppercase text-[#368DB1]">
              {props.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </h6>
            <span className="text-xs uppercase text-gray-600">
              {formattedDate && formattedDate}
            </span>
          </div>
          <h3 className="font-light">{props.title}</h3>
          <div className="flex w-full items-center justify-between">
            {props.author && (
              <Link href={props.author.slug} className="text-gray-300">
                by&nbsp;<span className="text-black">{props.author.name}</span>
              </Link>
            )}
            {props.time && (
              <div className="flex items-center text-sm text-gray-400">
                <Icon
                  type={
                    props.time.timeType === 'blog'
                      ? 'clock'
                      : props.time.timeType === 'podcast'
                        ? 'headphones'
                        : 'clock'
                  }
                  weight={'regular'}
                />
                &nbsp;
                <span className="text-black">
                  {props.time.timeTaken}&nbsp;mins
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <Link
            className={cn(
              buttonVariants({ variant: 'default', size: 'default' })
            )}
            href={props.slug}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
