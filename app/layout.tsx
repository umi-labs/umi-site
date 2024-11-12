import './globals.css';

import { nunito, poppins, tenorSans } from '@/app/_utils/fonts';
import localFont from 'next/font/local';
import { loadThemeSettings } from '@/sanity/loader/loadQuery';
import React from 'react';

const satoshi = localFont({
  src: '../public/assets/fonts/Satoshi.woff2',
  variable: '--font-satoshi',
});

const satoshiItalic = localFont({
  src: '../public/assets/fonts/SatoshiItalic.woff2',
  variable: '--font-satoshi-italic',
});

const switzer = localFont({
  src: '../public/assets/fonts/Switzer-Variable.woff2',
  variable: '--font-switzer',
});

const switzerItalic = localFont({
  src: '../public/assets/fonts/Switzer-VariableItalic.woff2',
  variable: '--font-switzer-italic',
});

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
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} ${tenorSans.variable} font-sans`}
      style={styles}
    >
      <head>
        <title></title>
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
