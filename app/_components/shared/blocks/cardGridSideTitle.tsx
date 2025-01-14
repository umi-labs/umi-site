'use client';
import React from 'react';

import Link from '@/app/_components/ui/link';
import { cn } from '@/app/_utils';
import type { Button, Icon as IconType } from '@/types/generics';
import { Icon } from '@/app/_components/ui/icon';
import { TopBuffer } from '@/app/_components/ui/buffers';
import { EyebrowSVG, IconBackground } from '@/app/_components/ui/svg-comps';

interface CardGridSideTitleProps {
  data: {
    separator?: boolean | undefined;
    title: string;
    content: string;
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

export default function CardGridSideTitle({ data }: CardGridSideTitleProps) {
  return (
    <section
      className={cn(
        'relative mx-auto flex min-h-full w-full max-w-7xl items-center justify-center overflow-visible bg-[#FAFAFA] py-10 md:py-32',
        data.topBuffer && 'xl:mt-30 mt-10 md:mt-20 lg:mt-28'
      )}
    >
      <TopBuffer colour="grey" visible={data.topBuffer} />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10 px-6 text-center md:grid md:grid-cols-3 md:grid-rows-1 md:gap-16 md:px-10">
        <div className="flex h-fit w-full grid-flow-row-dense flex-col items-center justify-center gap-y-10 place-self-start text-center md:items-start md:justify-start md:text-start">
          {data.separator && <EyebrowSVG className="" />}
          <h2>{data.title}</h2>
          <p>{data.content}</p>
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
            'col-span-2 grid w-full grid-flow-row items-center justify-center gap-9 md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {data.features.map((feature, i) => (
            <Card key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({
  feature,
  index,
}: {
  feature: CardGridSideTitleProps['data']['features'][0];
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
        <div className="relative flex items-center justify-center p-10">
          <IconBackground className={cn(`absolute inset-0 z-0 size-full`)} />
          <Icon
            type={feature.icon.type}
            weight={feature.icon.weight}
            className="z-10 size-10"
          />
        </div>
      )}
      <h3>{feature.title}</h3>
      {feature.content && <p>{feature.content}</p>}
      {feature.button && (
        <Link
          link={feature.button.link}
          variant={feature.button.type}
          className="w-full uppercase text-primary-accent hocus:font-bold hocus:text-primary-accent md:w-fit"
        >
          {feature.button.title}
        </Link>
      )}
    </div>
  );
};
