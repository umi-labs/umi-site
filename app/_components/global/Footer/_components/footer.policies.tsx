import type { NavItem } from '@/types/components/nav';
import { cn } from '@/app/_utils';
import Link from '@/app/_components/ui/link';
import React from 'react';

const Policies = ({ policies }: { policies: NavItem[] }) => {
  return (
    <div id="Policies" className="flex flex-wrap gap-y-4">
      {policies.map((policy, index) => {
        return (
          <div
            key={index}
            className={cn(
              'flex',
              policies.length > 1 &&
                "gap-x-2 after:pr-2 after:text-xs after:text-gray-500 after:content-['/'] last-of-type:after:pr-0 last-of-type:after:content-['']"
            )}
          >
            <Link link={policy.navItemUrl}>{policy?.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Policies;
