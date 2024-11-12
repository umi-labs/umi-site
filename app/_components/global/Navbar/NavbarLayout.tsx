'use client';

import React from 'react';
import type { SettingsPayload } from '@/types';
import {
  Nav,
  NavCta,
  NavLogo,
  NavMenuController,
} from '@/app/_components/global/Navbar/_components';

interface NavbarProps {
  data: SettingsPayload;
  logo?: {
    asset?: {
      _ref: string;
    };
  };
}

export default function NavbarLayout(props: NavbarProps) {
  const { data, logo } = props;

  const [menu, setMenu] = React.useState<boolean>(false);

  return data ? (
    <nav className="fixed top-0 z-[1000] flex w-full items-center justify-between border-b border-[#EEE] bg-white px-8 py-4 lg:pr-12">
      <NavLogo data={data} logo={logo} />
      <Nav menu={data?.mainNav?.menu} />
      <div className="flex items-center justify-center gap-4">
        <NavCta data={data} />
        <NavMenuController data={data} setMenu={setMenu} menu={menu} />
      </div>
    </nav>
  ) : null;
}