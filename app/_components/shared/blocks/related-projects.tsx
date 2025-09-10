import React from 'react';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { ProjectPayload } from '@/types';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';
import Container from '@/app/_components/ui/container';

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
    <Container id="RelatedProjects">
      <div className="text-center mb-12">
        {data.separator && <EyebrowSVG className="mx-auto mb-6" />}
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.body}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects?.map((project, index) => (
          <Link
            key={index}
            href={project.slug || '#'}
            className="group block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300"
          >
            {/* Project Image */}
            {project.coverImage && (
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.coverImage.asset?.url || ''}
                  alt={project.coverImage.asset?.altText || project.title || 'Project image'}
                  width={project.coverImage.asset?.metadata.dimensions.width}
                  height={project.coverImage.asset?.metadata.dimensions.height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            {/* Project Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                {/* Client Logo */}
                {project.clientLogo?.asset?.url && (
                  <Image
                    src={project.clientLogo.asset.url}
                    alt={project.clientLogo.asset.altText || 'Client logo'}
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                )}
                
                {/* Arrow Icon */}
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-primary-accent transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-accent mb-2">
                {project.clientName || project.title}
              </h3>
              
              {project.excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.excerpt}
                </p>
              )}
              
              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
