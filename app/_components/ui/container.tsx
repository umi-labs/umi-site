import React from 'react';
import { cn } from '@/lib/utils';
import { Layout } from '@/types/generics';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  options?: {
    colour?: Layout['colour'];
    maxWidth?: boolean;
  };
  children?: React.ReactNode;
  className?: React.ComponentPropsWithoutRef<'section'>['className'];
}

const DEFAULT_OPTIONS = {
  colour: 'light',
  maxWidth: false,
};

export default function Container({
  options,
  className,
  children,
  ...props
}: Props) {
  const { colour, maxWidth } = options || DEFAULT_OPTIONS;
  return (
    <section
      className={cn(
        'relative mx-auto flex min-h-full w-full flex-col items-center justify-center gap-y-16 px-10 py-10 md:py-30',
        !maxWidth && 'mx-auto max-w-7xl',
        colour === 'light' && 'bg-primary-background text-primary-foreground',
        colour === 'dark' && 'bg-[#FAFAFA]',
        colour === 'accent' && 'bg-primary-foreground text-primary-background',
        colour === 'transparent' && 'bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
