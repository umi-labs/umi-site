import { type PortableTextBlock } from 'next-sanity';
import type { Image as ImageType } from 'sanity';

import ImageBox from '@/app/_components/shared/ImageBox';
import { Button } from '@/app/_components/ui/button';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';

interface ImageWTextProps {
  images?: ImageType[];
  content: PortableTextBlock[];
  title?: string;
}

export default function ImageWText(props: ImageWTextProps) {
  const { images, content, title } = props;

  return (
    <section
      id="ImageWText"
      className="bg-midnight-green grid grid-cols-1 gap-y-20 px-8 py-12 pr-4 md:grid-cols-2 md:gap-x-16 md:gap-y-32 md:pr-8 lg:gap-x-32 lg:pr-16"
    >
      <div className="relative hidden flex-col justify-between gap-y-4 lg:flex lg:py-[7.5rem]">
        {images &&
          images?.map((image, key) => {
            return (
              <ImageBox
                key={key}
                image={image}
                alt={`Cover image from unsplash`}
                width={2070}
                height={1360}
                classesWrapper="relative aspect-[16/9]"
              />
            );
          })}
      </div>
      <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:pl-16 lg:pr-12">
        <div className="flex flex-col gap-y-4">
          <h2 className="uppercase">{title}</h2>
          <CustomPortableText value={content} />
          <Button>Click Me</Button>
        </div>
      </div>
    </section>
  );
}
