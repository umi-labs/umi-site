'use client';
import React from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPostsByAuthor } from '@/app/_actions/archive-queries';
import { PostCard } from '@/app/_components/ui/card/archive-card';
import { ErrorMessage } from '@/app/_components/shared/blocks/archive/archives-filterable-block';
import Loader from '@/app/_components/ui/loader';
import Container from '@/app/_components/ui/container';

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
    <Container 
      id="TeamInsightsGrid" 
      options={{ 
        colour: 'transparent',
        buffers: { top: true, bottom: true }
      }}
      className="py-16 md:py-32"
    >
      <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-[#1a2332] via-[#2c5a73] to-[#1a2332] bg-clip-text text-transparent text-center mb-12">
        Insight By:&nbsp;{name}
      </h2>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : isSuccess ? (
        <div className="grid w-full grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post, i) => (
            <PostCard key={i} archive={post} index={i} />
          ))}
        </div>
      ) : null}
    </Container>
  );
}
