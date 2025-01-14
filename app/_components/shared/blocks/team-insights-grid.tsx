'use client';
import React from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPostsByAuthor } from '@/app/_actions/archive-queries';
import { PostCard } from '@/app/_components/ui/card/archive-card';
import { ErrorMessage } from '@/app/_components/shared/blocks/archive/archives-filterable-block';
import Loader from '@/app/_components/ui/loader';

interface Props {
  slug: string;
  name?: string;
}

export default function TeamInsightsGrid({ slug, name }: Props) {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => getPostsByAuthor({ slug }),
    placeholderData: keepPreviousData,
    enabled: !!slug,
  });

  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-y-12 px-10 py-10 md:px-16 lg:px-0">
      <h2 id={slug}>Insight By:&nbsp;{name}</h2>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : isSuccess ? (
        <div className="grid w-full grid-cols-1 items-center justify-center gap-16 px-6 py-10 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post, i) => (
            <PostCard key={i} archive={post} index={i} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
