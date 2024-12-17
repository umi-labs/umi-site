import type { NavItem as NavItemType } from '@/types/components/nav';
import React from 'react';
import Link from '@/app/_components/ui/link';
import { cn } from '@/lib/utils';

const NavLink = ({
  navItem,
  title,
  setOpen,
}: {
  navItem: NavItemType;
  title: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Link
      link={navItem.navItemUrl}
      className={cn('button w-full capitalize text-charcoal')}
      onClick={() => {
        if (setOpen) {
          setOpen(false);
        }
      }}
      variant="link"
    >
      <span className={cn('')}>{title}</span>
    </Link>
  );
};

const NestedNavLink = ({
  navItem,
  title,
  setOpen,
}: {
  navItem: NavItemType;
  title: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Link
      link={navItem.navItemUrl}
      className={cn('button font-heading text-xl capitalize text-charcoal')}
      onClick={() => {
        if (setOpen) {
          setOpen(false);
        }
      }}
      variant="link"
      size="link"
    >
      <span
        className={cn(
          'block transition-transform duration-300 ease-default focus-within:translate-x-6 hover:translate-x-6 focus:translate-x-6 focus-visible:translate-x-6'
        )}
      >
        {title}
      </span>
    </Link>
  );
};

export { NavLink, NestedNavLink };
