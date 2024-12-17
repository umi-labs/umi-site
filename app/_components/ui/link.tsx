import React from 'react';
import NextLink from 'next/link';
import { VariantProps } from 'class-variance-authority';
import useResolvedHref, {
  ResolvedHref,
  Status,
} from '@/app/_utils/hooks/useResolvedHref';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/app/_components/ui/button';
import type { Link as LinkType } from '@/types/generics';

interface LinkProps
  extends React.ComponentPropsWithoutRef<'a'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href?: string;
  link?: LinkType;
  className?: React.ComponentPropsWithoutRef<'a'>['className'];
}

export default function Link({
  children,
  variant = 'link',
  size = 'link',
  link,
  href,
  className,
  ...props
}: LinkProps) {
  let resolvedHref: ResolvedHref;
  let url: string;

  if (link) {
    resolvedHref = useResolvedHref({ link: link });
  }

  url = href
    ? href
    : // TODO: fix this
      // @ts-expect-error - resolvedHref is not defined
      resolvedHref?.status === Status.SUCCESS
      ? resolvedHref?.href
      : '';

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
