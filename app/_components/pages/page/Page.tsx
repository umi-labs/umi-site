import React from 'react';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import HeroSwitcher from '@/app/_components/shared/Heros/HeroSwitcher';
import type { PagePayload } from '@/types';

export interface PageProps {
  data: PagePayload | null;
}

function Page({ data }: PageProps) {
  const { overview, blocks, title, hero } = data ?? {};

  return (
    <div>
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

        {/* blocks */}
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
