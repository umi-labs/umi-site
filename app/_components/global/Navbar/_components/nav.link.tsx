import type { NavItem } from '@/types/components/nav';
import React from 'react';
import Link from '@/app/_components/ui/link';
import { cn } from '@/lib/utils';

const NavLink = ({
  navItem,
  title,
  setOpen,
}: {
  navItem: NavItem;
  title: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Link
      href={
        navItem.hasParent && navItem.parentSlug
          ? `/${navItem.parentSlug}/${navItem.slug}`
          : navItem.slug
      }
      className={cn('button text-charcoal w-full capitalize')}
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
  title,
  navItem,
  setCurrentItem,
}: {
  navItem: NavItem;
  title: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <Link
      href={
        navItem.hasParent
          ? `/${navItem.parentSlug}/${navItem.slug}`
          : navItem.type !== 'page'
            ? `/${navItem.type}/${navItem.slug}`
            : `/${navItem.slug}`
      }
      className={cn('button text-charcoal font-heading text-xl capitalize')}
      onClick={() => {
        if (setCurrentItem) {
          setCurrentItem(null);
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
        {navItem.title}
      </span>
    </Link>
  );
};

export { NavLink, NestedNavLink };
