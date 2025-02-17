import type { EncodeDataAttributeCallback } from '@sanity/react-loader';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import HeroSwitcher from '@/app/_components/shared/heros/HeroSwitcher';
import type { HomePagePayload } from '@/types';
import SchemaMarkup from '@/app/_components/global/SchemaMarkup/Component';

export interface HomePageProps {
  data: HomePagePayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { hero, blocks, overview, title, metaData } = data ?? {};

  return (
    <div>
      {/* SCHEMA MARKUP */}
      {metaData?.schemaMarkup && (
        <SchemaMarkup schema={metaData.schemaMarkup} />
      )}

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
  );
}

export default HomePage;
