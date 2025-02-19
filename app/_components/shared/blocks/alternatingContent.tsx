import React from 'react';
import { cn } from '@/app/_utils';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import Image from 'next/image';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';

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
    <Container
      id="AlternatingContent"
      options={{
        colour: 'dark',
        buffers: {
          top: data.buffers?.top,
          bottom: data.buffers?.bottom,
        },
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-6">
          {data.separator && <EyebrowSVG className="" />}
          <h2>{data.title}</h2>
          {data.description && (
            <p className="max-w-4xl text-center">{data.description}</p>
          )}
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 md:gap-24">
          {data.content.map((item, i) => (
            <Card key={i} item={item} orientation={i % 2 ? 'rtl' : 'ltr'} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Card = ({
  item: { title, description, image },
  orientation = 'rtl',
}: {
  item: AlternatingContentProps['data']['content'][0];
  orientation: 'rtl' | 'ltr';
}) => {
  const { asset } = image || {};
  const { url, metadata, altText } = image?.asset || {};
  const { dimensions } = metadata || {};

  const aspectRatio =
    dimensions?.width && dimensions?.height
      ? `${dimensions?.width! / 100}/${dimensions?.height! / 100}`
      : '8/7';

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
        <CustomPortableText
          value={description}
          paragraphClasses={cn('text-left')}
        />
      </div>
      {asset && url && (
        <div
          className={cn(
            `flex aspect-[${aspectRatio}] h-fit w-full items-center justify-center`,
            orientation === 'rtl'
              ? 'md:col-start-2 md:row-start-1'
              : 'md:col-start-1 md:row-start-1'
          )}
        >
          <Image
            src={url || ''}
            alt={altText || ''}
            width={dimensions?.width || 0}
            height={dimensions?.height || 0}
            className="max-h-[-webkit-fill-available] object-contain object-center"
          />
        </div>
      )}
    </div>
  );
};
