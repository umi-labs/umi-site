import React from 'react';
import { cn } from '@/app/_utils';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { BottomBuffer, TopBuffer } from '@/app/_components/ui/buffers';
import Image from 'next/image';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';

interface AlternatingContentProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    description?: string | undefined;
    buffers?: {
      top?: boolean | undefined;
      bottom?: boolean | undefined;
    };
    content: {
      title: string;
      description: PortableTextBlock[];
      image: {
        asset?: {
          url: string;
          altText: string;
          metadata: {
            dimensions: {
              aspectRatio: number;
              height: number;
              _type: string;
              width: number;
            };
          };
        };
      };
    }[];
  };
}

export default function AlternatingContent({ data }: AlternatingContentProps) {
  return (
    <section
      className={cn(
        'relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-24 bg-[#FAFAFA] px-10 py-10 md:py-32',
        data.buffers?.top && 'mt-32',
        data.buffers?.bottom && 'mb-32'
      )}
    >
      <TopBuffer colour="grey" visible={data.buffers?.top} />
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
        {data.description && <p className="text-center">{data.description}</p>}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-16 md:gap-24">
        {data.content.map((item, i) => (
          <Card key={i} item={item} orientation={i % 2 ? 'rtl' : 'ltr'} />
        ))}
      </div>
      <BottomBuffer colour="grey" visible={data.buffers?.bottom} />
    </section>
  );
}

const Card = ({
  item: { title, description, image },
  orientation = 'rtl',
}: {
  item: AlternatingContentProps['data']['content'][0];
  orientation: 'rtl' | 'ltr';
}) => {
  return (
    <div className="grid grid-cols-1 grid-rows-2 place-items-center gap-16 md:grid-cols-2 md:grid-rows-1 md:gap-32">
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-y-6 text-center md:items-start md:text-start',
          orientation === 'rtl'
            ? 'md:col-start-1 md:row-start-1'
            : 'md:col-start-2 md:row-start-1'
        )}
      >
        <h3>{title}</h3>
        <CustomPortableText value={description} />
      </div>
      <div
        className={cn(
          'flex aspect-[8/7] h-full w-full items-center justify-center',
          orientation === 'rtl'
            ? 'md:col-start-2 md:row-start-1'
            : 'md:col-start-1 md:row-start-1'
        )}
      >
        <Image
          src={image.asset?.url || ''}
          alt={image.asset?.altText || ''}
          width={image.asset?.metadata?.dimensions?.width || 0}
          height={image.asset?.metadata?.dimensions?.height || 0}
          className="aspect-square object-cover object-center"
        />
      </div>
    </div>
  );
};
