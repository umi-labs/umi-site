'use client';

import type { NavItem as NavItemType } from '@/types/components/nav';
import type { Link } from '@/types/generics';
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

const useResolvedHref = ({ link }: { link?: Link }): ResolvedHref => {
  const [internalLink, setInternalLink] =
    React.useState<NavItemType['navItemUrl']['internalLink']>();
  const [externalLink, setExternalLink] = React.useState<Link['externalUrl']>();
  const [resolvedHref, setResolvedHref] = React.useState<{
    status: Status;
    href: string;
  }>({
    status: Status.IDLE,
    href: '',
  });

  React.useEffect(() => {
    if (link?.externalUrl) {
      setExternalLink(link?.externalUrl);
    }
  }, [link]);

  React.useEffect(() => {
    if (!link) {
      setResolvedHref({ status: Status.ERROR, href: '' });
    } else {
      setInternalLink(link?.internalLink);
    }
  }, [link]);

  React.useEffect(() => {
    if (externalLink) {
      setResolvedHref({
        status: Status.SUCCESS,
        href: externalLink,
      });
    } else if (internalLink?.postType) {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${internalLink?.postType.slug.current}/${internalLink?.slug}`,
      });
    } else if (internalLink?._type !== 'page') {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${internalLink?._type}/${internalLink?.slug}`,
      });
    } else {
      setResolvedHref({
        status: Status.SUCCESS,
        href: `/${internalLink?.slug}`,
      });
    }
  }, [internalLink, externalLink]);

  return resolvedHref;
};

export default useResolvedHref;
