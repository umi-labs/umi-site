import React from 'react';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { PortableTextBlock } from 'next-sanity';

interface Props {
  text: PortableTextBlock[];
}

export default function Example({ text }: Props) {
  return <CustomPortableText value={text} />;
}
