import React from 'react';
import NextLink from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import useResolvedHref, {
  ResolvedHref,
  Status,
} from '@/app/_utils/hooks/useResolvedHref';
import { NavItem } from '@/types';

interface LinkProps
  extends React.ComponentPropsWithoutRef<'a'>,
    VariantProps<typeof LinkStyles> {
  children: React.ReactNode;
  type?: 'internal' | 'internal-interactive' | 'external';
  href?: string;
  link?: NavItem;
  className?: React.ComponentPropsWithoutRef<'a'>['className'];
}

export default function Link({
  children,
  type = 'internal',
  link,
  href,
  className,
  ...props
}: LinkProps) {
  let resolvedHref: ResolvedHref;
  let url: string;

  if (link) {
    resolvedHref = useResolvedHref({ navItem: link });
  }

  url = href
    ? href
    : // TODO: fix this
      // @ts-expect-error - resolvedHref is not defined
      resolvedHref?.status === Status.SUCCESS
      ? resolvedHref?.href
      : '';
  return (
    <NextLink href={url} className={LinkStyles({ type, className })} {...props}>
      {children}
    </NextLink>
  );
}

const LinkStyles = cva('a', {
  variants: {
    type: {
      internal: [
        'text-xs text-gray-500 transition-all duration-300 ease-in-out hocus:text-gray-900 hocus:underline underline-offset-4',
      ],
      'internal-interactive': [
        'text-zinc-900 hocus:text-zinc-700 interactable',
      ],
      external: ["text-zinc-900 hocus:text-zinc-700 after:content-['_↗']"],
    },
  },
});
