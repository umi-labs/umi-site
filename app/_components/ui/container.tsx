import React from 'react';
import { cn } from '@/lib/utils';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';
import { Buffers, Layout } from '@/types/generics';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  options?: {
    colour?: Layout['colour'];
    buffers?: Buffers;
  };
  children?: React.ReactNode;
}

const DEFAULT_OPTIONS = {
  colour: 'light',
  buffers: {
    top: false,
    bottom: false,
  },
};

export default function Container({ options, children, ...props }: Props) {
  const { colour, buffers } = options || DEFAULT_OPTIONS;
  return (
    <section
      className={cn(
        'relative flex min-h-full w-full flex-col items-center justify-center gap-y-24 px-10 py-10 md:py-32',
        buffers?.top && 'mt-44',
        buffers?.bottom && 'mb-44',
        !buffers?.top && !buffers?.bottom && 'mx-auto max-w-7xl',
        colour === 'light' && 'bg-primary-background text-primary-foreground',
        colour === 'dark' && 'bg-[#FAFAFA]',
        colour === 'accent' && 'bg-primary-foreground text-primary-background'
      )}
      {...props}
    >
      <TopBuffer
        colour={
          colour === 'light' ? 'light' : colour === 'dark' ? 'dark' : 'accent'
        }
        visible={buffers?.top}
      />
      {children}
      <BottomBuffer
        colour={
          colour === 'light' ? 'light' : colour === 'dark' ? 'dark' : 'accent'
        }
        visible={buffers?.bottom}
      />
    </section>
  );
}
