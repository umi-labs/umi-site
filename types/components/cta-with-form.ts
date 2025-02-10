import { PortableTextBlock } from 'next-sanity';
import { Buffers, Button, Image } from '@/types/generics';

export interface CTAWithFormProps {
  data: {
    subtitle: string;
    title: string;
    content: PortableTextBlock[];
    buttons: Button[];
    image: Image;
    buffers?: Buffers;
  };
}
