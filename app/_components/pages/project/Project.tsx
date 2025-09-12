import React from 'react';
import Image from 'next/image';

import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import type { ProjectPayload } from '@/types';
import ProjectHero from '@/app/_components/shared/heros/ProjectHero';
import { CaretRight, Download } from '@phosphor-icons/react/dist/ssr';
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
      
      <div className="min-h-screen bg-primary-background">
        {/* Hero Section */}
        {data && <ProjectHero project={data} />}

        {/* Project Content */}
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {data?.excerpt && (
                <div className="mb-12">
                  <p className="text-xl text-[#313E4E] leading-relaxed">
                    {data.excerpt}
                  </p>
                </div>
              )}
              
              {body && (
                <div className="prose max-w-none">
                  <CustomPortableText
                    paragraphClasses="text-[#313E4E] leading-relaxed"
                    value={body}
                    headingLevel="h2"
                  />
                </div>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Client Info */}
                <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 p-8">
                  <h3 className="mb-6 text-xl font-light text-[#313E4E]">Project Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-[#313E4E]/70 uppercase tracking-wider">Client Name</h4>
                      <p className="text-xl font-bold text-[#313E4E]">{data?.clientName}</p>
                    </div>
                    
                    {data?.tags && data.tags.length > 0 && (
                      <div>
                        <h4 className="mb-3 text-sm font-medium text-[#313E4E]/70 uppercase tracking-wider">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-gradient-to-r from-[#B0DEE6]/20 to-[#FFE48C]/20 px-4 py-2 text-sm font-medium text-[#313E4E] uppercase border border-[#B0DEE6]/30"
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
                <div className="space-y-4">
                  {data?.clientUrl && (
                    <Link
                      href={data.clientUrl}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#368DB1] to-[#368DB1] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-[#313E4E] hover:to-[#368DB1] hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      Visit Website
                    </Link>
                  )}
                  {data?.caseStudyUrl && (
                    <Link
                      href={data.caseStudyUrl}
                      className="inline-flex w-full items-center justify-center rounded-xl border-2 border-[#368DB1] bg-transparent px-6 py-3 text-sm font-semibold text-[#368DB1] transition-all duration-300 hover:bg-[#368DB1] hover:text-white hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Case Study
                    </Link>
                  )}
                </div>

                {/* Related Projects */}
                {data?.relatedProjects && data.relatedProjects.length > 0 && (
                  <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 p-8">
                    <h3 className="mb-6 text-xl font-light text-[#313E4E]">Related Projects</h3>
                    <div className="space-y-4">
                      {data.relatedProjects.slice(0, 3).map((project, index) => (
                        <Link
                          key={index}
                          href={project.slug || '#'}
                          className="group block rounded-xl border border-[#B0DEE6]/20 bg-white/50 backdrop-blur-sm p-4 transition-all duration-300 hover:border-[#368DB1]/50 hover:bg-[#B0DEE6]/10 hover:shadow-lg hover:scale-105"
                        >
                          <div className="flex items-center gap-4">
                            {/* Project Logo */}
                            {project.clientLogo?.asset?.url && (
                              <div className="flex-shrink-0">
                                <Image
                                  src={project.clientLogo.asset.url}
                                  alt={project.clientLogo.asset.altText || project.clientName || 'Project logo'}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded-lg object-contain"
                                />
                              </div>
                            )}
                            
                            {/* Project Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-[#313E4E] group-hover:text-[#368DB1] truncate mb-1">
                                {project.clientName || project.title}
                              </h4>
                              {project.excerpt && (
                                <p className="text-xs text-[#313E4E]/70 line-clamp-2">
                                  {project.excerpt}
                                </p>
                              )}
                            </div>
                            
                            {/* Navigation Arrow */}
                            <div className="flex-shrink-0">
                              <CaretRight className="h-5 w-5 text-[#313E4E]/50 group-hover:text-[#368DB1] transition-colors" />
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
          <div className="bg-primary-background py-20">
            <div className="mx-auto max-w-6xl px-6 md:px-8">
              <CTASimple data={data.cta as any} />
            </div>
          </div>
        )}


        {/* Contact Form */}
        {data?.contactForm && (
          <div className="py-20">
            <div className="mx-auto max-w-6xl px-6 md:px-8">
              <CTATitleImage data={data.contactForm as any} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Project;
