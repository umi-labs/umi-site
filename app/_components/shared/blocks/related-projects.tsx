import React from 'react';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { ProjectPayload } from '@/types';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';

interface Props {
  data: {
    separator?: boolean | undefined;
    title: string;
    body: string;
    projects?: ProjectPayload[];
  };
}

export default function RelatedProjects({ data }: Props) {
  return (
    <section className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-14 px-10 py-10 md:py-32">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </div>
      <div className="grid w-full grid-cols-3 items-center justify-center gap-16 md:gap-24">
        {data.projects?.map((project, index) => (
          <div
            key={index}
            className="flex-center relative aspect-square flex-col gap-y-6"
          >
            <div className="absolute inset-0 z-[1] h-full w-full bg-gradient-to-b from-black/20 to-black/40" />
            {project.coverImage && (
              <Image
                src={project.coverImage.asset?.url || ''}
                alt={project.coverImage.asset?.altText || ''}
                width={project.coverImage.asset?.metadata.dimensions.width}
                height={project.coverImage.asset?.metadata.dimensions.height}
                className="absolute inset-0 -z-0 h-full object-cover object-center"
              />
            )}
            <div className="flex-center z-10 size-full flex-col gap-y-6 text-primary-background">
              <div className="flex flex-col gap-y-6">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
              </div>
              <div className="flex items-center justify-center gap-x-6">
                <Link
                  variant="secondary"
                  size="default"
                  href={project.slug}
                  className="hover:bg-transparent"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
