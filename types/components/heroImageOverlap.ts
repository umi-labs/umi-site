import type { Button, Image } from '@/types/generics';

export interface HeroImageOverlapProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    subtitle: string;
    content: string;
    buttons?: Button[] | undefined;
    image: Image;
  };
}
