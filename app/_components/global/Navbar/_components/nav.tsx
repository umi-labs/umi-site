import type { Menu as MenuType } from '@/types';
import React from 'react';
import NavItem from '@/app/_components/global/Navbar/_components/nav.item';

const Nav = ({ menu }: { menu?: MenuType[] }) => {
  return (
    <div className="hidden lg:flex">
      <div className="flex h-fit w-full items-center justify-center gap-4">
        {menu!.length > 0 &&
          menu!.map((item, index) => <NavItem key={index} item={item} />)}
      </div>
    </div>
  );
};

export default Nav;
