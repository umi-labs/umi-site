import React from 'react';
import Image from 'next/image';
import { ProjectPayload } from '@/types';
import Link from '@/app/_components/ui/link';
import { Download } from '@phosphor-icons/react/dist/ssr';
import { BottomBuffer } from '@/app/_components/ui/buffers';

interface ProjectHeroProps {
  project: ProjectPayload;
}

export default function ProjectHero({ project, ...props }: ProjectHeroProps) {
  return (
    <section className="xl:mb-30 relative mx-auto mb-10 mt-20 flex min-h-fit w-full max-w-7xl flex-col items-center justify-start bg-primary-background md:mb-20 lg:mb-28">
      <Image
        src={project?.coverImage?.asset.url || ''}
        alt={project?.coverImage?.asset.altText || ''}
        width={project?.coverImage?.asset.metadata.dimensions.width}
        height={project?.coverImage?.asset.metadata.dimensions.height}
        className="max-h-[650px] w-screen object-cover object-top"
      />
      <div className="grid w-full grid-cols-4 items-center justify-center gap-9 gap-y-10 bg-primary-foreground px-6 py-8 text-primary-background md:px-10">
        <div>
          <Image
            src={project?.clientLogo?.asset.url || ''}
            alt={project?.clientLogo?.asset.altText || ''}
            width={project?.clientLogo?.asset.metadata.dimensions.width}
            height={project?.clientLogo?.asset.metadata.dimensions.height}
          />
        </div>
        <div className="col-span-2 flex flex-col items-start justify-start gap-y-6">
          <h2>{project?.clientName}</h2>
          <span className="flex flex-wrap items-start justify-start gap-2 text-xs text-gray-700">
            {project?.tags?.map((tag, i) => (
              <span
                className="rounded-full bg-white px-3 py-2 uppercase hover:no-underline"
                key={i}
              >
                {tag}
              </span>
            ))}
          </span>
        </div>
        <div className="font-regular flex flex-col items-center justify-center gap-y-6 uppercase">
          {project.clientUrl && (
            <Link
              variant="secondary"
              size="default"
              className="w-full"
              href={project.clientUrl}
            >
              Visit Website
            </Link>
          )}
          {project.caseStudyUrl && (
            <Link
              variant="outline"
              size="default"
              className="w-full border border-primary-background text-primary-background hover:bg-primary-background hover:text-primary-foreground"
              href={project.caseStudyUrl}
            >
              <Download weight="fill" className="mr-2 size-4" /> Download Case
              Study
            </Link>
          )}
        </div>
      </div>
      <BottomBuffer
        visible={true}
        colour={'blue'}
        className={'w-full max-w-7xl'}
      />
    </section>
  );
}
