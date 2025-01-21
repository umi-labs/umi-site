import './globals.css';

import { nunito, poppins, tenorSans } from '@/app/_utils/fonts';
import { loadThemeSettings } from '@/sanity/loader/loadQuery';
import React from 'react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: themeSettings }] = await Promise.all([loadThemeSettings()]);

  const styles = {
    '--background-color': themeSettings?.background?.hex,
    '--foreground-color': themeSettings?.foreground?.hex,
    '--accent-color': themeSettings?.accent?.hex,
    '--secondary-accent-color': themeSettings?.secondaryAccent?.hex,
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} ${tenorSans.variable} font-sans`}
      style={styles}
    >
      <head>
        <link
          rel="apple-touch-icon"
          href={themeSettings?.favicon?.appleTouchIcon?.asset?.url}
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={themeSettings?.favicon?.favicon32?.asset?.url}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={themeSettings?.favicon?.favicon32?.asset?.url}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={themeSettings?.favicon?.androidChrome192?.asset?.url}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
