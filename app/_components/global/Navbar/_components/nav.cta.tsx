import type { SettingsPayload } from '@/types';
import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import React from 'react';

const NavCta = ({ data }: { data: SettingsPayload }) => {
  return (
    data?.mainNav?.ctaButton?.text && (
      <div className="hidden items-center justify-center md:flex">
        <Link href={data?.mainNav?.ctaButton?.url}>
          <Button className="">{data?.mainNav?.ctaButton?.text}</Button>
        </Link>
      </div>
    )
  );
};

export default NavCta;
