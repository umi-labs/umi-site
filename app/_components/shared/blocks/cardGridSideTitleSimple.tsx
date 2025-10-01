'use client';
import React from 'react';
import Link from '@/app/_components/ui/link';

import { cn } from '@/app/_utils';
import { Button, Icon as IconType } from '@/types/generics';
import { Icon } from '@/app/_components/ui/icon';
import { EyebrowSVG, IconBackground } from '@/app/_components/ui/svg-comps';
import { PortableTextBlock } from 'next-sanity';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import Container from '@/app/_components/ui/container';

interface CardGridSideTitleSimpleProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    content: PortableTextBlock[];
    buttons?: Button[] | undefined;
    topBuffer?: boolean | undefined;
    features: {
      icon?: IconType | undefined;
      title: string;
      content?: string | undefined;
      button?: Button | undefined;
    }[];
  };
}

export default function CardGridSideTitleSimple({
  data,
}: CardGridSideTitleSimpleProps) {
  return (
    <Container
      id="CardGridSideTitleSimple"
      options={{
        colour: 'dark',
        buffers: {
          top: data.topBuffer,
        },
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 text-center md:grid md:grid-cols-3 md:grid-rows-1 md:gap-16 md:px-10">
        <div className="flex h-fit w-full grid-flow-row-dense flex-col items-center justify-center gap-y-10 place-self-start text-center md:items-start md:justify-start md:text-start">
          {data.separator && <EyebrowSVG className="" />}
          <h2>{data.title}</h2>
          <CustomPortableText value={data.content} />
          <div className="flex w-full flex-col items-start justify-start gap-6 lg:flex-row lg:items-center">
            {data?.buttons?.map((button, i) => (
              <Link
                key={i}
                link={button.link}
                size="default"
                variant={button.type}
                className="w-full lg:w-auto"
              >
                {button.title}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={cn(
            'col-span-2 grid w-full grid-flow-row items-end justify-center gap-9 md:grid-cols-2 lg:mt-20'
          )}
        >
          {data.features.map((feature, i) => (
            <Card key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Card = ({
  feature,
  index,
}: {
  feature: CardGridSideTitleSimpleProps['data']['features'][0];
  index: number;
}) => {
  return (
    <div
      id={`card_${index}`}
      className={cn(
        'flex h-full w-full flex-col items-center gap-y-10 bg-white p-6 shadow-md',
        feature.icon ? 'justify-between' : 'justify-center'
      )}
    >
      {feature.icon && (
        <div className="relative flex size-48 items-center justify-center p-10">
          <IconBackground
            className={cn(`absolute inset-0 z-0 mr-2.5 size-full`)}
          />
          <Icon
            type={feature.icon.type}
            weight={feature.icon.weight}
            className="z-10 size-20"
          />
        </div>
      )}
      <h3>{feature.title}</h3>
      {feature.content && <p>{feature.content}</p>}
      {feature.button && (
        <Link
          link={feature.button.link}
          onClick={() => {}}
          variant={feature.button.type}
          className="w-full uppercase text-primary-accent hocus:font-bold hocus:text-primary-accent md:w-fit"
        >
          {feature.button.title}
        </Link>
      )}
    </div>
  );
};
