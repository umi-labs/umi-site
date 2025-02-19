'use client';
import React from 'react';
import Image from 'next/image';
import type { Image as ImageType } from '@/types/generics';
import Link from '@/app/_components/ui/link';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { getLogos, LogosPayload } from '@/app/_actions/logos';
import { useQuery } from '@tanstack/react-query';
import Container from '@/app/_components/ui/container';

interface LogoCloudProps {
  data: {
    separator?: boolean;
    title: string;
    manual?: boolean;
    logos: {
      logo: ImageType;
      name?: string | undefined;
      link?: string | undefined;
    }[];
  };
}

export default function LogoCloud({ data }: LogoCloudProps) {
  const [logos, setLogos] = React.useState<LogosPayload[]>([]);

  React.useEffect(() => {
    if (data.manual === true) return;
    setLogos(data.logos);
  }, [data]);

  const { data: logosArray } = useQuery({
    queryKey: ['logos', logos],
    queryFn: () => getLogos(),
  });

  React.useEffect(() => {
    if (!logosArray) return;
    if (!data.manual) {
      setLogos(logosArray!);
    }
  }, [logosArray]);

  return (
    <Container
      id="LogoCloud"
      options={{
        colour: 'dark',
        buffers: {
          top: false,
          bottom: false,
        },
      }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
      </div>
      <div className="grid w-full grid-cols-2 place-items-center items-center justify-center gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {logos?.map((logo, i) => <Logo key={i} logo={logo.logo} />)}
      </div>
    </Container>
  );
}

const Logo = (logo: LogoCloudProps['data']['logos'][0]) => {
  return (
    <Link href={logo.link}>
      <Image
        src={logo.logo.asset?.url || ''}
        alt={logo.logo.asset?.altText || ''}
        width={logo.logo.asset?.metadata?.dimensions.width || 200}
        height={logo.logo.asset?.metadata?.dimensions.height || 200}
      />
      <span className="sr-only">{logo.name}</span>
    </Link>
  );
};
