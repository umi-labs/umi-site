import type { Button, Image } from '@/types/generics';
import { PortableTextBlock } from 'next-sanity';

export interface HeroImageOverlapProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    subtitle: string;
    content: PortableTextBlock[];
    buttons?: Button[] | undefined;
    image: Image;
  };
}
