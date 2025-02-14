import type { SettingsPayload } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ImageBox from '@/app/_components/shared/ImageBox';
import React from 'react';

const NavLogo = ({
  logo,
  data,
  className,
}: {
  logo?: {
    asset?: {
      _ref: string;
    };
  };
  className?: string;
  data: SettingsPayload;
}) => {
  return (
    <Link
      href={'/'}
      className={cn(
        'interactable flex w-fit items-center justify-center gap-x-3 overflow-x-hidden whitespace-nowrap',
        className
      )}
    >
      {logo && (
        <ImageBox
          imageClasses="w-fit h-12 object-cover object-center"
          classesWrapper={'object-cover object-center'}
          image={logo}
          width={800}
          height={300}
        />
      )}
      {!logo && (
        <span className={''}>
          <span className={'font-semibold'}>
            {data?.name?.split(' ')[0]}&nbsp;
          </span>
          {data?.name?.split(' ')[1]}
        </span>
      )}
    </Link>
  );
};

export default NavLogo;
