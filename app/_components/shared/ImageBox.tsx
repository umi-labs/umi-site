import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';

interface ImageBoxProps {
  image?: { asset?: any };
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classesWrapper?: string;
  imageClasses?: string;
  'data-sanity'?: string;
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper = 'overflow-hidden ',
  imageClasses = 'absolute h-full w-full object-cover',
  ...props
}: ImageBoxProps) {
  const imageUrl =
    // @ts-ignore
    image && urlForImage(image)?.height(height).width(width).fit('crop').url();

  return (
    <div
      className={`h-full w-full ${classesWrapper}`}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          className={imageClasses}
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
        />
      )}
    </div>
  );
}
