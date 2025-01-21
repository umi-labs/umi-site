import type { Button, Image } from '@/types/generics';
import { PortableTextBlock } from 'next-sanity';
import { VideoProps } from '@/app/_components/ui/video';

export interface HeroWithMediaProps {
  data: {
    separator?: boolean | undefined;
    background?: ('light' | 'dark') | undefined;
    subtitle?: string | undefined;
    title: string;
    content: PortableTextBlock[];
    buttons?: Button[] | undefined;
    mediaType?: ('image' | 'video') | undefined;
    image: Image | undefined;
    video?: VideoProps | undefined;
    bottomContent?:
      | {
          title: string;
          content: PortableTextBlock[];
        }
      | undefined;
  };
}
