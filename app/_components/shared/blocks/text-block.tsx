import React from 'react';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { PortableTextBlock } from 'next-sanity';
import Container from '@/app/_components/ui/container';
import { cn } from '@/app/_utils';
import { Layout } from '@/types/generics';

interface Props {
  data: {
    content: PortableTextBlock[];
    layout?: Layout;
  };
}

export default function TextBlock({ data }: Props) {
  return (
    <Container id="TextBlock">
      <div
        className={cn(
          'mx-auto my-4 flex max-w-3xl flex-col px-6',
          `justify-${data.layout?.justify || 'center'}`,
          `items-${data.layout?.align || 'center'}`,
          `text-${data.layout?.textAlign || 'center'}`
        )}
      >
        <CustomPortableText
          value={data.content}
          paragraphClasses="gap-y-4 space-y-4"
        />
      </div>
    </Container>
  );
}
