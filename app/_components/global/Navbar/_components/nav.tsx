'use client';

import type { Menu as MenuType } from '@/types/components/nav';
import React from 'react';
import NavItem from '@/app/_components/global/Navbar/_components/nav.item';

const Nav = ({ menu }: { menu?: MenuType[] }) => {
  const [currentItem, setCurrentItem] = React.useState<string | null>(null);

  return (
    <div className="hidden lg:flex">
      <div className="flex h-fit w-full items-center justify-center gap-4">
        {menu!.length > 0 &&
          menu!.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              setCurrentItem={setCurrentItem}
              currentItem={currentItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Nav;
