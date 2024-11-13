import React from 'react';
import NextLink from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';

interface LinkProps
  extends React.ComponentPropsWithoutRef<'a'>,
    VariantProps<typeof LinkStyles> {
  children: React.ReactNode;
  type?: 'internal' | 'internal-interactive' | 'external';
  href?: string;
  link?: any;
  className?: React.ComponentPropsWithoutRef<'a'>['className'];
}

const LinkStyles = cva('a', {
  variants: {
    type: {
      internal: [
        'text-xs text-gray-500 transition-all duration-300 ease-in-out hocus:text-gray-900',
      ],
      'internal-interactive': [
        'text-zinc-900 hocus:text-zinc-700 interactable',
      ],
      external: ["text-zinc-900 hocus:text-zinc-700 after:content-['_↗']"],
    },
  },
});

const URLResolver = (link: any) => {
  if (link?.postType) {
    return `/${link?.postType.slug.current}/${link?.slug}`;
  } else {
    return `/${link?.slug}`;
  }
};

export default function Link({
  children,
  type = 'internal',
  link,
  href,
  className,
  ...props
}: LinkProps) {
  const resolvedHref = href ? href : URLResolver(link);
  return (
    <NextLink
      href={resolvedHref}
      className={LinkStyles({ type, className })}
      {...props}
    >
      {children}
    </NextLink>
  );
}
