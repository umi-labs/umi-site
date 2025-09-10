import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import type { PostPayload } from '@/types';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import SchemaMarkup from '@/app/_components/global/SchemaMarkup/Component';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

export interface PostProps {
  data: PostPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function Post({ data, encodeDataAttribute }: PostProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, body, metaData, author, _updatedAt, coverImage, excerpt } = data ?? {};
  
  const formattedDate = _updatedAt ? format(parseISO(_updatedAt), 'MMM d, yyyy') : '';

  return (
    <article className="min-h-screen bg-white">
      {/* SCHEMA MARKUP */}
      {metaData?.schemaMarkup && (
        <SchemaMarkup schema={metaData.schemaMarkup} />
      )}

      {/* Article Content */}
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-16">
        {/* Title */}
        <h1 className="mb-8 leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="mb-8 text-xl text-gray-600 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
          <div className="flex items-center space-x-4">
            {/* Author Avatar */}
            {author?.image?.asset?.url ? (
              <Image
                src={author.image.asset.url}
                alt={author.image.asset.altText || author?.name || 'Author'}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-accent text-white text-xl">
                {author?.name?.charAt(0) || 'A'}
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-900">
                By {author?.name || 'Anonymous'}
              </h3>
              {author?.role && (
                <p className="text-sm text-gray-600">{author.role}</p>
              )}
              {author?.description && (
                <p className="text-sm text-gray-600">{author.description}</p>
              )}
              
              {/* Social Links */}
              {author?.socialLinks && author.socialLinks.length > 0 && (
                <div className="flex items-center space-x-3 mt-3">
                  {author.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-accent transition-colors"
                      title={social.title}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        {social.socialMedia === 'twitter' && (
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        )}
                        {social.socialMedia === 'linkedin' && (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        )}
                        {social.socialMedia === 'instagram' && (
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                        )}
                        {social.socialMedia === 'facebook' && (
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        )}
                        {social.socialMedia === 'youtube' && (
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        )}
                        {social.socialMedia === 'spotify' && (
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                        )}
                        {social.socialMedia === 'apple_podcasts' && (
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
                        )}
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {formattedDate && (
              <span>{formattedDate}</span>
            )}
          </div>
        </div>

        {/* Categories and Read Time */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Categories:</span>
            <div className="flex flex-wrap gap-2">
              {data?.categories?.map((category: any, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-primary-accent bg-primary-accent/10 rounded-full"
                >
                  {category.title || category}
                </span>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            5 min read
          </div>
        </div>

        {/* Article Body */}
        {body && (
          <CustomPortableText
            value={body}
            paragraphClasses="prose prose-lg max-w-none mx-auto text-gray-800 leading-relaxed"
            headingLevel="h2"
          />
        )}
      </div>
    </article>
  );
}

export default Post;
