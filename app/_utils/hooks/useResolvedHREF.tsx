import type { NavItem as NavItemType } from '@/types';
import React from 'react';
import { resolveHref } from '@/sanity/lib/utils';

const useResolvedHREF = ({
  navItem,
  parent,
}: {
  navItem: NavItemType;
  parent?: string;
}) => {
  const [resolvedHref, setResolvedHref] = React.useState<string>();
  if (!navItem) {
    return null;
  }

  const href = navItem.navItemUrl?.displayExternal
    ? navItem.navItemUrl.externalUrl
    : resolveHref(
        navItem?.navItemUrl?.internalLink?._type,
        navItem?.navItemUrl?.internalLink?.slug
      );

  if (!href) {
    return null;
  }

  React.useEffect(() => {
    if (parent) {
      setResolvedHref(`/${parent.toLowerCase()}${href}`);
    } else {
      setResolvedHref(href);
    }
  }, [href, parent]);

  return resolvedHref;
};

export default useResolvedHREF;
