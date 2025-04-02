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
  if (!link) return;

  const url = href
    ? href
    : link.displayExternal
      ? link.url!
      : link.hasParent
        ? `/${link.parentSlug}/${link.slug}`
        : link.type !== 'page'
          ? `/${link.type}/${link.slug}`
          : `/${link.slug}`;

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
