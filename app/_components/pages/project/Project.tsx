import React from 'react';
import Image from 'next/image';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import type { ProjectPayload } from '@/types';
import ProjectHero from '@/app/_components/shared/heros/ProjectHero';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import CTASimple from '@/app/_components/shared/blocks/CTASimple';
import CTATitleImage from '@/app/_components/shared/blocks/CTATitleImage';
import SchemaMarkup from '@/app/_components/global/SchemaMarkup/Component';

export interface ProjectProps {
  data: ProjectPayload | null;
}

function Project({ data }: ProjectProps) {
  const { body, metaData } = data ?? {};

  const relatedProjects = {
    separator: true,
    title: 'Related Projects',
    body: 'Explore more of our work and discover similar projects.',
    projects: data?.relatedProjects?.map((project, index) => ({
      ...project,
    })),
  };

  return (
    <>
      {/* SCHEMA MARKUP */}
      {metaData?.schemaMarkup && (
        <SchemaMarkup schema={metaData.schemaMarkup} />
      )}
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        {data && <ProjectHero project={data} />}

        {/* Project Content */}
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {data?.excerpt && (
                <div className="mb-8">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {data.excerpt}
                  </p>
                </div>
              )}
              
              {body && (
                <div className="prose max-w-none">
                  <CustomPortableText
                    paragraphClasses="text-gray-600"
                    value={body}
                    headingLevel="h2"
                  />
                </div>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Client Info */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-gray-500">Client Name</h4>
                      <p className="text-lg font-semibold text-gray-900">{data?.clientName}</p>
                    </div>
                    
                    {data?.tags && data.tags.length > 0 && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-500">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {data?.clientUrl && (
                    <Link
                      href={data.clientUrl}
                      className="block w-full rounded-lg bg-primary-accent px-4 py-3 text-center font-medium text-white transition-colors hover:bg-primary-accent/90"
                    >
                      Visit Website
                    </Link>
                  )}
                  {data?.caseStudyUrl && (
                    <Link
                      href={data.caseStudyUrl}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Download className="mr-2 inline h-4 w-4" />
                      Download Case Study
                    </Link>
                  )}
                </div>

                {/* Related Projects */}
                {data?.relatedProjects && data.relatedProjects.length > 0 && (
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold">Related Projects</h3>
                    <div className="space-y-3">
                      {data.relatedProjects.slice(0, 3).map((project, index) => (
                        <Link
                          key={index}
                          href={project.slug || '#'}
                          className="group block rounded-md border border-gray-100 p-3 transition-all hover:border-gray-300 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            {/* Project Logo */}
                            {project.clientLogo?.asset?.url && (
                              <div className="flex-shrink-0">
                                <Image
                                  src={project.clientLogo.asset.url}
                                  alt={project.clientLogo.asset.altText || project.clientName || 'Project logo'}
                                  width={32}
                                  height={32}
                                  className="h-8 w-8 rounded object-contain"
                                />
                              </div>
                            )}
                            
                            {/* Project Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-accent truncate mb-0">
                                {project.clientName || project.title}
                              </h4>
                              {project.excerpt && (
                                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                  {project.excerpt}
                                </p>
                              )}
                            </div>
                            
                            {/* Navigation Arrow */}
                            <div className="flex-shrink-0">
                              <CaretRight className="h-5 w-5 text-gray-500 group-hover:text-primary-accent transition-colors" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Case Study CTA */}
        {data?.cta && (
          <div className="bg-gray-50 py-16">
            <div className="mx-auto max-w-6xl px-6 md:px-8">
              <CTASimple data={data.cta} />
            </div>
          </div>
        )}


        {/* Contact Form */}
        {data?.contactForm && (
          <div className="bg-primary-background py-16">
            <div className="mx-auto max-w-6xl px-6 md:px-8">
              <CTATitleImage data={data.contactForm} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Project;
