'use client';
import React from 'react';
import Image from 'next/image';
import type { Image as ImageType } from '@/types/generics';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { getLogos, LogosPayload } from '@/app/_actions/logos';
import { useQuery } from '@tanstack/react-query';
import Container from '@/app/_components/ui/container';
import Link from '@/app/_components/ui/link';

interface LogoCloudProps {
  data: {
    separator?: boolean;
    title: string;
    manual?: boolean;
    logos: LogosPayload[];
  };
}

export default function LogoCloud({ data }: LogoCloudProps) {
  const [logos, setLogos] = React.useState<LogosPayload[]>([]);

  React.useEffect(() => {
    if (data.manual === false) return;
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
      className="gap-y-12"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
      </div>
      {logos && logos.length !== 0 && (
        <div className="grid w-full grid-cols-2 place-items-center items-center justify-center gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {logos?.map((logo, i) => <Logo key={i} logo={logo} />)}
        </div>
      )}
    </Container>
  );
}

const Logo = ({ logo }: { logo: LogoCloudProps['data']['logos'][0] }) => {
  return (
    <Link link={logo.link}>
      <Image
        src={logo.logo.asset?.url || ''}
        alt={logo.logo.asset?.altText || ''}
        width={logo.logo.asset?.metadata?.dimensions.width || 150}
        height={logo.logo.asset?.metadata?.dimensions.height || 150}
        className="aspect-square max-h-40 w-auto p-8"
      />
      <span className="sr-only">{logo.name}</span>
    </Link>
  );
};
