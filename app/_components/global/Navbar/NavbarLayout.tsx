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
    <div className="fixed top-0 inset-x-0 z-[1000] px-4 pt-4 lg:px-6 lg:pt-6">
      <nav className="mx-auto flex max-h-[80px] w-full max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md px-8 py-4 shadow-lg lg:px-10">
        <NavLogo data={data} logo={logo} className="z-[1001]" />
        <Nav menu={data?.mainNav?.menu} />
        <div className="flex items-center justify-center gap-4">
          {!menu && <NavCta data={data} />}
          <NavMenuController data={data} setMenu={setMenu} menu={menu} />
        </div>
      </nav>
    </div>
  ) : null;
}
