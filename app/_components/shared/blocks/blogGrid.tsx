'use client';
import React from 'react';
import { getRecentPosts } from '@/app/_actions/recentPosts';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { useQuery } from '@tanstack/react-query';
import Container from '@/app/_components/ui/container';
import { PostCard } from '@/app/_components/ui/card/archive-card';

interface BlogGridProps {
  data: {
    separator?: boolean;
    title: string;
  };
}

export default function BlogGrid({ data }: BlogGridProps) {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getRecentPosts(),
  });

  return (
    <Container 
      id="BlogGrid"
      options={{
        colour: 'transparent',
        maxWidth: false,
      }}
      className="py-16 md:py-24"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts?.map((blog, i) => <PostCard archive={blog} index={i} key={i} />)}
      </div>
    </Container>
  );
}

