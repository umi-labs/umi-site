import React from 'react';
import { TeamPayload } from '@/types';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';

interface Props {
  team: TeamPayload;
}

export default function TeamCard({ team }: Props) {
  const slug = `/team/${team.slug}`;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-y-6 bg-primary-background text-primary-foreground shadow-lg">
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-y-6 p-12">
        <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-center">
          {team.image && (
            <Image
              src={team.image.asset.url || ''}
              alt={team.image.asset.altText || ''}
              width={team.image.asset.metadata?.dimensions.width}
              height={team.image.asset.metadata?.dimensions.height}
              className="aspect-square h-full w-full object-cover object-center"
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h3 className="text-center text-2xl">{team.name}</h3>
          <span>{team.role}</span>
        </div>
        <Link
          /* @ts-ignore */
          href={slug}
          variant="secondary"
          size="default"
          className="border border-[#F3F5F6] bg-[#F3F5F6] text-lg uppercase text-primary-foreground transition-colors duration-300 ease-in-out hocus:border-[#F3F5F6] hocus:bg-primary-foreground hocus:text-[#F3F5F6]"
        >
          Find Out More
        </Link>
      </div>
    </div>
  );
}
