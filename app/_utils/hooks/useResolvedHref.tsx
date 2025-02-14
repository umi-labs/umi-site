'use client';

import type { NavItem } from '@/types/components/nav';
import React from 'react';

export enum Status {
  IDLE = 'idle',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ResolvedHref = {
  status: Status;
  href: string;
};

const useResolvedHref = ({ link }: { link?: NavItem }): ResolvedHref => {
  const [resolvedHref, setResolvedHref] = React.useState<{
    status: Status;
    href: string;
  }>({
    status: Status.IDLE,
    href: '',
  });

  React.useEffect(() => {
    if (link?.displayExternal && link?.url) {
      setResolvedHref({
        status: Status.SUCCESS,
        href: link.url,
      });
    } else if (link?.hasParent) {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${link?.parentSlug}/${link?.slug}`,
      });
    } else if (link?.type !== 'page') {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${link?.type}/${link?.slug}`,
      });
    } else {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${link?.slug}`,
      });
    }
  }, [link]);

  return resolvedHref;
};

export default useResolvedHref;
