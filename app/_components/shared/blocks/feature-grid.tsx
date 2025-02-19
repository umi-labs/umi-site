'use client';
import React from 'react';
import type { Icon as IconType } from '@/types/generics';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { Icon } from '@/app/_components/ui/icon';
import Container from '@/app/_components/ui/container';

interface Props {
  data: {
    separator?: boolean | undefined;
    subtitle: string;
    title: string;
    description?: string | undefined;
    features: {
      title: string;
      description: string;
      icon: IconType;
    }[];
  };
}

export default function FeatureGrid({ data }: Props) {
  return (
    <Container id="FeatureGrid">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-2 items-center justify-center gap-9 md:grid-cols-2 md:grid-rows-1 lg:grid-flow-row lg:grid-cols-3">
        {data.features.map((feature, i) => (
          <Feature key={i} feature={feature} />
        ))}
      </div>
    </Container>
  );
}

const Feature = ({ feature }: { feature: Props['data']['features'][0] }) => {
  return (
    <div className="flex-center h-full w-full gap-x-9 p-6">
      <div className="relative flex items-center justify-center p-4">
        <IconBackground className="absolute inset-0 -z-0 h-full w-full" />
        <Icon
          type={feature.icon.type}
          weight={feature.icon.weight}
          className="z-10 size-10"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <h4>{feature.title}</h4>
        <p className="text-sm text-gray-600">{feature.description}</p>
      </div>
    </div>
  );
};

const IconBackground = (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="151"
      height="142"
      viewBox="0 0 151 142"
      fill="none"
      {...props}
    >
      <path
        d="M20.9928 105.784C-32.8563 71.2947 33.3992 40.9578 60.3237 19.2866C125.801 -39.3381 167.164 54.3381 144.014 110.364C122.395 166.618 54.8596 133.911 20.9928 105.77"
        fill="#EBF7F9"
      />
    </svg>
  );
};
