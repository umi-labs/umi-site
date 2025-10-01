'use client';
import React from 'react';
import NextLink from 'next/link';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/app/_components/ui/button';
import { NavItem } from '@/types/components/nav';

interface LinkProps
  extends React.ComponentPropsWithoutRef<'a'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href?: string;
  link?: NavItem;
  className?: React.ComponentPropsWithoutRef<'a'>['className'];
}

export function Link({
  children,
  variant = 'link',
  size = 'link',
  link,
  href,
  className,
  ...props
}: LinkProps) {
  // If we have href, use it directly
  if (href) {
    return (
      <NextLink
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </NextLink>
    );
  }

  // If no link data at all, return null
  if (!link) {
    return null;
  }

  // If we have link data, construct URL
  const url = link.displayExternal
    ? link.url || '#'
    : link.hasParent
      ? `/${link.parentSlug || ''}/${link.slug || ''}`
      : link.type !== 'page'
        ? `/${link.type || ''}/${link.slug || ''}`
        : `/${link.slug || ''}`;

  // If URL is just '/' or contains 'undefined', use fallback
  if (url === '/' || url.includes('undefined') || !url || url === '//') {
    return (
      <span className={cn(buttonVariants({ variant, size, className }))}>
        {children}
      </span>
    );
  }

  return (
    <NextLink
      href={url}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export default Link;
