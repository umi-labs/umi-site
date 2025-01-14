import React from 'react';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import type { ProjectPayload } from '@/types';
import ProjectHero from '@/app/_components/shared/heros/ProjectHero';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import CTASimple from '@/app/_components/shared/blocks/CTASimple';
import RelatedProjects from '@/app/_components/shared/blocks/related-projects';
import CTATitleImage from '@/app/_components/shared/blocks/CTATitleImage';

export interface ProjectProps {
  data: ProjectPayload | null;
}

function Project({ data }: ProjectProps) {
  const { body } = data ?? {};
  
  const relatedProjects = {
    separator: true,
    title: 'Related Projects',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    projects: data?.relatedProjects?.map((project, index) => ({
      ...project,
    })),
  };

  return (
    <div>
      <div className="mb-14">
        {/* Hero */}
        {data && <ProjectHero project={data} />}

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl mx-auto mt-40 mb-20"
            value={body}
          />
        )}

        {/* Project Pagination */}
        {data?.relatedProjects && (
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-12 md:px-16 lg:px-32">
            {data?.relatedProjects?.length > 0 && (
              <Link
                href={data?.relatedProjects[0].slug || ''}
                className="flex items-center justify-start gap-x-6"
              >
                <CaretLeft className="text-primary-accent" />
                <h2 className="text-2xl font-semibold">Previous Project</h2>
              </Link>
            )}
            {data?.relatedProjects?.length > 1 && (
              <Link
                href={data?.relatedProjects[1].slug || ''}
                className="flex items-center justify-end gap-x-6"
              >
                <h2 className="text-2xl font-semibold">Next Project</h2>
                <CaretRight className="text-primary-accent" />
              </Link>
            )}
          </div>
        )}

        {/* Case Study CTA */}
        {/* @ts-expect-error - data.cta.data exists and is there but issue with type */}
        {data?.cta && <CTASimple data={data.cta} />}

        {/* Related Projects */}
        {relatedProjects.projects && relatedProjects?.projects?.length > 0 && (
          <RelatedProjects data={relatedProjects} />
        )}

        {/* Contact Form */}
        {/* @ts-expect-error - issue where type isn't recognising all the types passed down */}
        {data?.contactForm && <CTATitleImage data={data.contactForm} />}
      </div>
    </div>
  );
}

export default Project;
