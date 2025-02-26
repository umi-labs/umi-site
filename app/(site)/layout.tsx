import '@/app/globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import React, { Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Cursor } from '@/app/_components/global/Cursor/Cursor';
import { Footer } from '@/app/_components/global/Footer';
import { Navbar } from '@/app/_components/global/Navbar';
import { loadSEOSettings, loadSettings } from '@/sanity/loader/loadQuery';
import NavbarSkeleton from '@/app/_components/global/Navbar/NavbarSkeleton';
import { cn } from '@/lib/utils';
import Providers from '@/app/_components/providers';
import { GoogleTagManager } from '@next/third-parties/google';

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing')
);

export async function generateMetadata(): Promise<Metadata> {
  const [{ data }] = await Promise.all([loadSEOSettings()]);

  const seo = data?.metaData;

  // const ogImage = urlForOpenGraphImage(seo?.ogImage);
  return {
    title: {
      template: `%s | UMI Digital`,
      default: 'Home',
    },
    description: seo?.description ? seo.description : undefined,
    // openGraph: {
    //   images: ogImage ? [ogImage] : [],
    // },
    keywords: seo?.keywords ? seo.keywords : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: '--background-color',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: settings }] = await Promise.all([loadSettings()]);

  return (
    <Providers>
      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
      )}
      <NuqsAdapter>
        <div
          className={cn(
            `flex min-h-screen w-screen flex-col selection:bg-primary-accent selection:text-primary-background`,
            settings?.customCursor && 'custom-cursor'
          )}
        >
          <Suspense fallback={<NavbarSkeleton />}>
            <Navbar />
          </Suspense>
          <div className="flex-grow">
            <Suspense>{children}</Suspense>
          </div>
          <Suspense>
            <Footer />
          </Suspense>
          <Suspense>{settings?.customCursor && <Cursor />}</Suspense>
          <Suspense>
            <Analytics />
          </Suspense>
        </div>
        {(await draftMode()).isEnabled && <LiveVisualEditing />}
      </NuqsAdapter>
    </Providers>
  );
}
