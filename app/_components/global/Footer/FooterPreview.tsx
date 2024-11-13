'use client';

import { useSettings, useSiteAndThemeSettings } from '@/sanity/loader/useQuery';

import FooterLayout from './FooterLayout';

type Props = {
  site: Parameters<typeof useSettings>[0];
  theme: Parameters<typeof useSiteAndThemeSettings>[1];
};

export default function NavbarPreview(props: Props) {
  const { siteSettings, themeSettings } = useSiteAndThemeSettings(
    props.site,
    props.theme
  );

  return <FooterLayout data={siteSettings.data!} theme={themeSettings!} />;
}
