import React from 'react';
import Image from 'next/image';
import { ProjectPayload } from '@/types';
import Link from '@/app/_components/ui/link';
import { Download } from '@phosphor-icons/react/dist/ssr';

interface ProjectHeroProps {
  project: ProjectPayload;
}

export default function ProjectHero({ project, ...props }: ProjectHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src={project?.coverImage?.asset?.url || ''}
          alt={project?.coverImage?.asset?.altText || ''}
          width={project?.coverImage?.asset?.metadata?.dimensions.width}
          height={project?.coverImage?.asset?.metadata?.dimensions.height}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:px-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Left Column - Project Info */}
            <div className="space-y-6">
              {project?.clientLogo && (
                <div className="mb-6">
                  <Image
                    src={project.clientLogo.asset?.url || ''}
                    alt={project.clientLogo.asset?.altText || ''}
                    width={project.clientLogo.asset?.metadata?.dimensions.width}
                    height={project.clientLogo.asset?.metadata?.dimensions.height}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              )}
              
              <h1 className="text-4xl font-light bg-gradient-to-r from-white via-[#B0DEE6] to-[#FFE48C] bg-clip-text text-transparent md:text-5xl lg:text-6xl">
                {project?.clientName || project?.title}
              </h1>
              
              {project?.excerpt && (
                <p className="text-xl text-gray-200 leading-relaxed">
                  {project.excerpt}
                </p>
              )}

              {project?.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Actions */}
            <div className="flex flex-col gap-4 md:items-end">
              {project?.clientUrl && (
                <Link
                  href={project.clientUrl}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg"
                >
                  Visit Website
                </Link>
              )}
              {project?.caseStudyUrl && (
                <Link
                  href={project.caseStudyUrl}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-gray-900"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Case Study
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

