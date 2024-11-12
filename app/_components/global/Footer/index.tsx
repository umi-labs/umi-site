import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

import { loadSettings, loadThemeSettings } from '@/sanity/loader/loadQuery';

import FooterLayout from './FooterLayout';

const FooterPreview = dynamic(() => import('./FooterPreview'));

export async function Footer() {
  const initial = await loadSettings();
  const theme = await loadThemeSettings();

  if (draftMode().isEnabled) {
    return <FooterPreview initial={initial} />;
  }

  return <FooterLayout data={initial.data} theme={theme.data} />;
}
