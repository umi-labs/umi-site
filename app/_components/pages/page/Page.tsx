import React from 'react';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import HeroSwitcher from '@/app/_components/shared/heros/HeroSwitcher';
import type { PagePayload } from '@/types';
import SchemaMarkup from '@/app/_components/global/SchemaMarkup/Component';

export interface PageProps {
  data: PagePayload | null;
}

function Page({ data }: PageProps) {
  const { overview, blocks, title, hero, metaData } = data ?? {};

  return (
    <>
      {/* SCHEMA MARKUP */}
      {metaData?.schemaMarkup && (
        <SchemaMarkup schema={metaData.schemaMarkup} />
      )}

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
    </>
  );
}

export default Page;
