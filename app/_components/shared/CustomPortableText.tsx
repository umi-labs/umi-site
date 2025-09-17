import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity';
import type { Image } from 'sanity';
import Link from 'next/link';

import ImageWText from '@/app/_components/shared/blocks/ImageWText';
import ImageBox from '@/app/_components/shared/ImageBox';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/Component';
import CTASimple from '@/app/_components/shared/blocks/CTASimple';
import CardGridSideTitle from '@/app/_components/shared/blocks/cardGridSideTitle';
import CardGridSideTitleSimple from '@/app/_components/shared/blocks/cardGridSideTitleSimple';
import HeroWithMedia from '@/app/_components/shared/heros/heroWithMedia';
import TestimonialsCarousel from '@/app/_components/shared/blocks/testimonialsCarousel';
import LogoCloud from '@/app/_components/shared/blocks/logo-cloud';
import CTAWithForm from '@/app/_components/shared/blocks/CTAWithForm';
import BlogGrid from '@/app/_components/shared/blocks/blogGrid';
import CTATitleImage from '@/app/_components/shared/blocks/CTATitleImage';
import PortfolioFullWidth from '@/app/_components/shared/blocks/portfolio-full-width';
import ArchivesSection from '@/app/_components/shared/blocks/archive/archives-section';
import AlternatingContent from '@/app/_components/shared/blocks/alternatingContent';
import FAQs from '@/app/_components/shared/blocks/FAQs';
import Carousel from '@/app/_components/shared/blocks/carousel';
import FeatureGrid from '@/app/_components/shared/blocks/feature-grid';
import JobVacancies from '@/app/_components/shared/blocks/job-vacancies';
import ContentBlock from '@/app/_components/shared/blocks/content-block';
import MeetTheTeamSection from '@/app/_components/shared/blocks/meet-the-team/meet-the-team-section';
import TextBlock from '@/app/_components/shared/blocks/text-block';
import BasicHero from '@/app/_components/shared/heros/BasicHero';
import CTABlock from '@/app/_components/shared/blocks/cta-block';
import FormBlock from '@/app/_components/shared/blocks/form-block';
import CTA from '@/app/_components/shared/blocks/CTA';
import { cn } from '@/app/_utils';

export function CustomPortableText({
  paragraphClasses,
  value,
  headingLevel = "h1",
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return (
          <p
            className={`${paragraphClasses} mb-4 font-normal tracking-reduced`}
          >
            {children}
          </p>
        );
      },
      h1: ({ children }) => {
        const HeadingTag = headingLevel as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            className={`${paragraphClasses} mb-4 font-heading text-3xl md:text-5xl font-normal leading-[1.2] tracking-reduced`}
          >
            {children}
          </HeadingTag>
        );
      },
      h2: ({ children }) => {
        return (
          <h2
            className={`${paragraphClasses} mb-4 font-heading text-4xl font-normal leading-[1.2] tracking-reduced`}
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        return (
          <h3
            className={`${paragraphClasses} mb-4 font-heading text-2xl font-normal leading-[1.2] tracking-reduced`}
          >
            {children}
          </h3>
        );
      },
      h4: ({ children }) => {
        return (
          <h4
            className={`${paragraphClasses} mb-4 font-heading text-xl font-normal leading-[1.2] tracking-reduced`}
          >
            {children}
          </h4>
        );
      },
      h5: ({ children }) => {
        return (
          <h5
            className={`${paragraphClasses} mb-4 font-subtitle text-xs font-bold leading-[1.2] tracking-expanded`}
          >
            {children}
          </h5>
        );
      },
      h6: ({ children }) => {
        return (
          <h6
            className={`${paragraphClasses} mb-4 font-heading text-lg font-normal leading-[1.2] tracking-normal`}
          >
            {children}
          </h6>
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            className={'underline transition hover:opacity-50'}
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        );
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul
          className={cn('mt-xl mx-2 my-4 list-disc *:ml-2', paragraphClasses)}
        >
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol
          className={cn(
            'mt-lg my-4 mx-2 list-decimal *:ml-3 *:marker:font-bold',
            paragraphClasses
          )}
        >
          {children}
        </ol>
      ),
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
      ctaBlock: ({ value }) => {
        return <CTABlock data={value} />;
      },
      basicHero: ({ value }) => {
        return <BasicHero {...value} />;
      },
      textBlock: ({ value }) => {
        return <TextBlock data={value} />;
      },
      cta: ({ value }) => {
        return <CTA {...value} />;
      },
      ctaSimple: ({ value }) => {
        return <CTASimple data={value} />;
      },
      archiveBlock: ({ value }) => {
        return <ArchivesSection data={value} />;
      },
      ctaTitleImage: ({ value }) => {
        return <CTATitleImage data={value} />;
      },
      meetTheTeam: ({ value }) => {
        return <MeetTheTeamSection data={value} />;
      },
      alternatingContent: ({ value }) => {
        return <AlternatingContent data={value} />;
      },
      faqBlock: ({ value }) => {
        return <FAQs data={value} />;
      },
      carousel: ({ value }) => {
        return <Carousel data={value} />;
      },
      featureGrid: ({ value }) => {
        return <FeatureGrid data={value} />;
      },
      jobVacancies: ({ value }) => {
        return <JobVacancies data={value} />;
      },
      contentBlock: ({ value }) => {
        return <ContentBlock data={value} />;
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
      portfolioFullWidth: ({ value }) => {
        return <PortfolioFullWidth data={value} />;
      },
      formBlock: ({ value }) => {
        return <FormBlock data={value} />;
      },
      form: ({ value }) => {
        const { form, _key } = value || {};
        return (
          <div className="flex h-screen w-screen items-center justify-center">
            <FormBuilderBlock form={form} uid={_key} />
          </div>
        );
      },
      undefined: () => {
        return null;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
