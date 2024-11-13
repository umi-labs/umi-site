'use client';

import type { NavItem as NavItemType } from '@/types';
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

const useResolvedHref = ({
  navItem,
}: {
  navItem: NavItemType;
}): ResolvedHref => {
  const [internalLink, setInternalLink] =
    React.useState<NavItemType['navItemUrl']['internalLink']>();
  const [resolvedHref, setResolvedHref] = React.useState<{
    status: Status;
    href: string;
  }>({
    status: Status.IDLE,
    href: '',
  });

  React.useEffect(() => {
    if (!navItem) {
      setResolvedHref({ status: Status.ERROR, href: '' });
    } else {
      setInternalLink(navItem?.navItemUrl?.internalLink);
    }
  }, [navItem]);

  React.useEffect(() => {
    if (internalLink?.postType) {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${internalLink?.postType.slug.current}/${internalLink?.slug}`,
      });
    } else {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${internalLink?.slug}`,
      });
    }
  }, [internalLink]);

  // const href = navItem.navItemUrl?.displayExternal
  //   ? navItem.navItemUrl.externalUrl
  //   : resolveHref(internalLink?._type, internalLink?.slug.current);
  //
  // if (!href) {
  //   setResolvedHref({ status: Status.ERROR, href: '' });
  // }

  return resolvedHref;
};

export default useResolvedHref;
