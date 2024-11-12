import type { SettingsPayload } from '@/types';
import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import React from 'react';

const NavCta = ({ data }: { data: SettingsPayload }) => {
  return (
    data?.mainNav?.ctaButton?.text && (
      <div className="flex items-center justify-center">
        <Link href={data?.mainNav?.ctaButton?.url}>
          <Button className="rounded-md bg-charcoal px-4 py-2 text-white">
            {data?.mainNav?.ctaButton?.text}
          </Button>
        </Link>
      </div>
    )
  );
};

export default NavCta;
