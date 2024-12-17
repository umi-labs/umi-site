import type { Button, Image } from '@/types/generics';

export interface CTASimpleProps {
  data: {
    subtitle: string;
    title: string;
    content: string;
    button: Button;
    image: Image;
    bottomBuffer?: boolean | undefined;
    topBuffer?: boolean | undefined;
  };
}
