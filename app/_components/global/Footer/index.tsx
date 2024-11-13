import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

import { loadSettings, loadThemeSettings } from '@/sanity/loader/loadQuery';

import FooterLayout from './FooterLayout';

const FooterPreview = dynamic(() => import('./FooterPreview'));

export async function Footer() {
  const site = await loadSettings();
  const theme = await loadThemeSettings();

  if (draftMode().isEnabled) {
    return <FooterPreview site={site} theme={theme} />;
  }

  return <FooterLayout data={site.data} theme={theme.data} />;
}
