import React from 'react';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import HeroSwitcher from '@/app/_components/shared/heros/HeroSwitcher';
import type { PagePayload } from '@/types';
import Script from 'next/script';

export interface PageProps {
  data: PagePayload | null;
}

function Page({ data }: PageProps) {
  const { overview, blocks, title, hero } = data ?? {};

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Test',
    description: 'This is a test desc',
  };

  return (
    <div>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-14">
        {/* Hero */}
        {hero &&
          hero.map((item, index) => (
            <HeroSwitcher
              key={index}
              data={item}
              title={title}
              overview={overview}
            />
          ))}

        {/* components */}
        {blocks && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={blocks}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
