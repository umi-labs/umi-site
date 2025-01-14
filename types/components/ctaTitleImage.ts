import {
  Button as ButtonType,
  Icon as IconType,
  Image as ImageType,
} from '@/types/generics';

export interface CTATitleImageProps {
  data: {
    subtitle: string;
    title: string;
    content: string;
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
