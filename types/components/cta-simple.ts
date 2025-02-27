import type { Buffers, Button, Image, Layout } from '@/types/generics';
import { PortableTextBlock } from 'next-sanity';

export interface CTASimpleProps {
  data: {
    _type: 'ctaSimple';
    subtitle: string;
    title: string;
    content: PortableTextBlock[];
    buttons: Button[];
    image: Image;
    buffers?: Buffers;
    layout?: Layout;
  };
}
