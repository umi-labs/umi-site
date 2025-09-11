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
    <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B0DEE6]/5 via-[#368DB1]/5 to-[#FFE48C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between gap-y-6 p-8">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          {team.image && (
            <div className="relative overflow-hidden rounded-full shadow-lg">
              <Image
                src={team.image.asset?.url || ''}
                alt={team.image.asset?.altText || ''}
                width={team.image.asset?.metadata?.dimensions.width}
                height={team.image.asset?.metadata?.dimensions.height}
                className="aspect-square h-32 w-32 object-cover object-center"
              />
              {/* Hover shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center gap-y-3 text-center">
          <h3 className="text-2xl font-bold text-[#1a2332] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#B0DEE6] group-hover:to-[#FFE48C] group-hover:bg-clip-text transition-all duration-500">
            {team.name}
          </h3>
          <span className="text-[#313E4E]/80 font-medium text-sm uppercase tracking-wider">
            {team.role}
          </span>
        </div>
        
        <Link
          /* @ts-ignore */
          href={slug}
          variant="secondary"
          size="default"
          className="bg-[#313E4E] text-white hover:bg-[#B0DEE6] hover:text-[#1a2332] transition-all duration-300 w-full text-center"
        >
          Find Out More
        </Link>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      </div>

      {/* Border accent */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-[#B0DEE6]/20 via-[#368DB1]/20 to-[#FFE48C]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
