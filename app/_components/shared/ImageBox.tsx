import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';
import React from 'react';

interface ImageBoxProps extends React.ComponentProps<'div'> {
  image?: { asset?: any };
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classesWrapper?: React.ComponentProps<'div'>['className'];
  imageClasses?: React.ComponentProps<'img'>['className'];
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
      className={`h-fit w-auto ${classesWrapper}`}
      data-sanity={props['data-sanity']}
      {...props}
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
