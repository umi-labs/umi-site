import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

import { loadSettings, loadThemeSettings } from '@/sanity/loader/loadQuery';

import NavbarLayout from './NavbarLayout';

const NavbarPreview = dynamic(() => import('./NavbarPreview'));

export async function Navbar() {
  const settings = await loadSettings();
  const { data: theme } = await loadThemeSettings();

  if (draftMode().isEnabled) {
    return <NavbarPreview initial={settings} />;
  }

  // @ts-ignore
  return <NavbarLayout data={settings.data} logo={theme?.logo} />;
}
