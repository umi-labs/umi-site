import React from 'react';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { PortableTextBlock } from 'next-sanity';
import Container from '@/app/_components/ui/container';

interface Props {
  text: {
    content: PortableTextBlock[];
  };
}

export default function TextBlock({ text }: Props) {
  return (
    <Container id="TextBlock">
      <div className="mx-auto my-4 max-w-3xl px-6">
        <CustomPortableText value={text.content} paragraphClasses="gap-y-4" />
      </div>
    </Container>
  );
}
