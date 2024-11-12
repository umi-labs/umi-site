import type { Sponsor } from '@/types';
import ImageBox from '@/app/_components/shared/ImageBox';
import React from 'react';

export const Sponsors = ({ sponsors }: { sponsors?: Sponsor[] }) => {
  return (
    <div className="flex gap-x-4">
      {sponsors?.map((sponsor, key) => {
        return (
          <div key={key} className="flex flex-col gap-y-2">
            <ImageBox
              imageClasses="h-20 w-fit md:h-44 object-contain object-center"
              classesWrapper={
                'flex justify-center items-center overflow-visible'
              }
              image={sponsor?.image}
              width={800}
              height={800}
            />
            <p className="sr-only">{sponsor?.title}</p>
          </div>
        );
      })}
    </div>
  );
};
