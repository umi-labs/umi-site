import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity';
import type { Image } from 'sanity';
import Link from 'next/link';

import ImageWText from '@/app/_components/shared/blocks/ImageWText';
import ImageBox from '@/app/_components/shared/ImageBox';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/FormBuilder';
import CTASimple from '@/app/_components/shared/blocks/CTASimple';
import CardGridSideTitle from '@/app/_components/shared/blocks/cardGridSideTitle';
import CardGridSideTitleSimple from '@/app/_components/shared/blocks/cardGridSideTitleSimple';
import HeroWithMedia from '@/app/_components/shared/heros/heroWithMedia';
import TestimonialsCarousel from '@/app/_components/shared/blocks/testimonialsCarousel';
import LogoCloud from '@/app/_components/shared/blocks/logoCloud';
import CTAWithForm from '@/app/_components/shared/blocks/CTAWithForm';
import BlogGrid from '@/app/_components/shared/blocks/blogGrid';
import CTATitleImage from '@/app/_components/shared/blocks/CTATitleImage';

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      ctaSimple: ({ value }) => {
        return <CTASimple data={value} />;
      },
      ctaTitleImage: ({ value }) => {
        return <CTATitleImage data={value} />;
      },
      ctaWithForm: ({ value }) => {
        return <CTAWithForm data={value} />;
      },
      cardGridSideTitle: ({ value }) => {
        return <CardGridSideTitle data={value} />;
      },
      cardGridSideTitleSimple: ({ value }) => {
        return <CardGridSideTitleSimple data={value} />;
      },
      testimonialsCarousel: ({ value }) => {
        return <TestimonialsCarousel data={value} />;
      },
      heroWithMedia: ({ value }) => {
        return <HeroWithMedia data={value} />;
      },
      logoCloud: ({ value }) => {
        return <LogoCloud data={value} />;
      },
      blogGrid: ({ value }) => {
        return <BlogGrid data={value} />;
      },
      imageWithText: ({ value }) => {
        const { content, images, title } = value || {};
        return <ImageWText content={content} images={images} title={title} />;
      },
      form: ({ value }) => {
        const { formFields, _key, inbox } = value || {};
        return (
          <div className="flex h-screen w-screen items-center justify-center">
            <FormBuilderBlock
              formFields={formFields}
              uid={_key}
              inbox={inbox}
            />
          </div>
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
