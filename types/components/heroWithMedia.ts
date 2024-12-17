import type { Button, Image } from '@/types/generics';

export interface HeroWithMediaProps {
  data: {
    separator?: boolean | undefined;
    background?: ('light' | 'dark') | undefined;
    subtitle?: string | undefined;
    title: string;
    content: string;
    buttons?: Button[] | undefined;
    mediaType?: ('image' | 'video') | undefined;
    image: Image | undefined;
    video?:
      | {
          alt: string;
          src: string;
          width: number;
          height: number;
        }
      | undefined;
    bottomContent?:
      | {
          title: string;
          content: string;
        }
      | undefined;
  };
}
