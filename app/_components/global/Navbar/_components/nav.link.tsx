import type { NavItem as NavItemType } from '@/types';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import useResolvedHREF from '@/app/_utils/hooks/useResolvedHREF';

const NavLink = ({
  navItem,
  title,
  parent,
  setOpen,
}: {
  navItem: NavItemType;
  title: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  parent?: string;
}) => {
  const resolvedHref = useResolvedHREF({ navItem, parent });

  return (
    <Link
      href={resolvedHref || ''}
      className={cn('button w-full text-charcoal')}
      onClick={() => {
        if (setOpen) {
          setOpen(false);
        }
      }}
    >
      <span className={cn('')}>{title}</span>
    </Link>
  );
};

const NestedNavLink = ({
  navItem,
  title,
  parent,
  setOpen,
}: {
  navItem: NavItemType;
  title: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  parent?: string;
}) => {
  const resolvedHref = useResolvedHREF({ navItem, parent });

  return (
    <Link
      href={resolvedHref || ''}
      className={cn('w-full font-heading text-2xl uppercase text-charcoal')}
      onClick={() => {
        if (setOpen) {
          setOpen(false);
        }
      }}
    >
      <span
        className={cn(
          'ease-default block transition-transform duration-300 focus-within:translate-x-6 hover:translate-x-6 focus:translate-x-6 focus-visible:translate-x-6'
        )}
      >
        {title}
      </span>
    </Link>
  );
};

export { NavLink, NestedNavLink };
