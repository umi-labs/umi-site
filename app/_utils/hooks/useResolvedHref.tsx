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
    console.log('useResolvedHref called with link:', link);
    
    if (!link) {
      console.log('No link provided');
      setResolvedHref({
        status: Status.ERROR,
        href: '',
      });
    } else if (link?.displayExternal && link?.url) {
      console.log('External link:', link.url);
      setResolvedHref({
        status: Status.SUCCESS,
        href: link.url,
      });
    } else if (link && 'internalLink' in link && link.internalLink) {
      // Handle nested internalLink structure
      const internalLink = link.internalLink as any;
      console.log('Internal link data:', internalLink);
      
      if (internalLink?.hasParent && internalLink?.parentSlug) {
        const href = `/${internalLink?.parentSlug}/${internalLink?.slug}`;
        console.log('Has parent link:', href);
        setResolvedHref({
          status: Status.SUCCESS,
          href: href,
        });
      } else if (internalLink?.type && internalLink?.type !== 'page') {
        const href = `/${internalLink?.type}/${internalLink?.slug}`;
        console.log('Type link:', href);
        setResolvedHref({
          status: Status.SUCCESS,
          href: href,
        });
      } else {
        const href = `/${internalLink?.slug}`;
        console.log('Page link:', href);
        setResolvedHref({
          status: Status.SUCCESS,
          href: href,
        });
      }
    } else if (link?.hasParent) {
      // Fallback for flattened structure
      const href = `/${link?.parentSlug}/${link?.slug}`;
      console.log('Has parent link (flattened):', href);
      setResolvedHref({
        status: Status.SUCCESS,
        href: href,
      });
    } else if (link?.type !== 'page') {
      // Fallback for flattened structure
      const href = `/${link?.type}/${link?.slug}`;
      console.log('Type link (flattened):', href);
      setResolvedHref({
        status: Status.SUCCESS,
        href: href,
      });
    } else {
      // Fallback for flattened structure
      const href = `/${link?.slug}`;
      console.log('Page link (flattened):', href);
      setResolvedHref({
        status: Status.SUCCESS,
        href: href,
      });
    }
  }, [link]);

  return resolvedHref;
};

export default useResolvedHref;
