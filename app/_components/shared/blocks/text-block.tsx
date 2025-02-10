import React from 'react';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { PortableTextBlock } from 'next-sanity';

interface Props {
  text: {
    content: PortableTextBlock[];
  };
}

export default function TextBlock({ text }: Props) {
  return (
    <div className="my-40 text-center">
      <CustomPortableText
        value={text.content}
        paragraphClasses="mx-auto my-4 max-w-3xl text-center px-6"
      />
    </div>
  );
}
