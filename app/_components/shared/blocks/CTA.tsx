import React from 'react';
import Container from '@/app/_components/ui/container';
import { PortableTextBlock } from 'next-sanity';
import type { Buffers, Layout } from '@/types/generics';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { cn } from '@/lib/utils';

type Column = {
  content: PortableTextBlock[];
  width:
    | 'full'
    | 'half'
    | 'oneThird'
    | 'twoThirds'
    | 'oneQuarter'
    | 'threeQuarters';
};

interface Props {
  columns: Column[];
  layout?: Layout;
  buffers?: Buffers;
}

export default function CTA(props: Props) {
  console.log(props);
  const { columns, layout, buffers } = props;

  console.log(columns);

  const colsSpanClasses = {
    full: 'col-span-12',
    half: 'col-span-6',
    oneThird: 'col-span-4',
    twoThirds: 'col-span-8',
    oneQuarter: 'col-span-3',
    threeQuarters: 'col-span-9',
  };

  return (
    <Container id="CTA" options={{ colour: layout?.colour, buffers }}>
      <div className="grid w-full grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, i) => {
            const { width, content } = col;

            return (
              <div
                key={i}
                className={cn(`col-span-4 lg:${colsSpanClasses[width]}`, {
                  'md:col-span-2': width !== 'full',
                })}
              >
                <CustomPortableText
                  value={content}
                  paragraphClasses="text-center"
                />
              </div>
            );
          })}
      </div>
    </Container>
  );
}
