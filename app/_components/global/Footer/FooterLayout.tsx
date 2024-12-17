'use client';

import React from 'react';

import type { SettingsPayload, ThemeSettingsPayload } from '@/types';
import {
  BottomBar,
  CenterBar,
  TopBar,
} from '@/app/_components/global/Footer/_components';

interface FooterProps {
  data: SettingsPayload;
  theme: ThemeSettingsPayload;
}

export default function Footer(props: FooterProps) {
  const { data, theme } = props;
  const { logo } = theme || {};

  return (
    <footer className="bottom-0 grid w-screen grid-flow-row-dense divide-y-2 divide-[#EAECED] px-6 py-8 lg:px-10">
      <TopBar data={data} logo={logo} />
      <CenterBar data={data} />
      <BottomBar data={data} logo={logo} />
    </footer>
  );
}
