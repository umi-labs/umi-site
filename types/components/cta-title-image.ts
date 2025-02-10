import {
  Button as ButtonType,
  Icon as IconType,
  Image as ImageType,
} from '@/types/generics';
import { PortableTextBlock } from 'next-sanity';

export interface CTATitleImageProps {
  data: {
    subtitle: string;
    title: string;
    content: PortableTextBlock[];
    points?:
      | {
          icon: IconType;
          content: string;
        }[]
      | undefined;
    buttons?: ButtonType[] | undefined;
    image: ImageType;
  };
}
