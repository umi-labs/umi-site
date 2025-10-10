'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@/app/_components/ui/icon';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/Component';
import useResolvedHref from '@/app/_utils/hooks/useResolvedHref';
import { buttonVariants } from '@/app/_components/ui/button';
import Container from '@/app/_components/ui/container';
import Image from 'next/image';

interface Props {
  data: {
    quotation: {
      _id: string;
      title: string;
      quotation: Array<{
        _type: 'requestQuotation';
        title: string;
        subtitle?: string;
        separator?: boolean;
        content?: Array<any>;
        points?: Array<{
          content: string;
          icon: {
            type: string;
            weight: string;
          };
        }>;
        form?: {
          _id: string;
          title: string;
          formFields: Array<any>;
        };
        buttons?: Array<{
          title: string;
          type: string;
          link: {
            href?: string;
            internalLink?: {
              _type: string;
              title: string;
              slug: {
                current: string;
              };
            };
          };
        }>;
        testimonial?: {
          author: {
            _id: string;
            name: string;
            role: string;
            image?: {
              asset: {
                url: string;
                altText?: string;
              };
            };
          };
          quote: string;
        };
      }>;
    };
  };
}

export default function QuotationBlock({ data }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!data?.quotation?.quotation?.[0]) {
    console.log('QuotationBlock: No quotation data found');
    return null;
  }

  const quotationData = data.quotation.quotation[0];

  return (
    <Container
      id="QuotationBlock"
      options={{
        colour: 'transparent',
        maxWidth: true
      }}
      className="py-16 md:py-24"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.42 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-normal leading-[1.2] tracking-reduced text-[#313E4E] mb-4">
            {quotationData.title}
          </h2>
          {quotationData.subtitle && (
            <p className="text-lg text-[#313E4E]/70 font-normal tracking-reduced">
              {quotationData.subtitle}
            </p>
          )}
          {quotationData.separator && (
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#368DB1] to-[#FFE48C] mx-auto mt-6"></div>
          )}
        </div>

        {/* Content */}
        {quotationData.content && (
          <div className="mb-8">
            <CustomPortableText
              value={quotationData.content}
              paragraphClasses="text-[#313E4E]/80 leading-relaxed"
            />
          </div>
        )}

        {/* Key Points */}
        {quotationData.points && quotationData.points.length > 0 && (
          <div className="mb-8">
            <div className="grid gap-4 md:grid-cols-2">
              {quotationData.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  {point.icon && (
                    <Icon
                      type={point.icon.type as any}
                      weight={point.icon.weight as any}
                      className="size-5 text-[#368DB1] mt-1 flex-shrink-0"
                    />
                  )}
                  <p className="text-[#313E4E]/80 font-normal tracking-reduced">
                    {point.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        {quotationData.form && (
          <div className="mb-8">
            <FormBuilderBlock
              form={quotationData.form as any}
              uid={quotationData.form._id}
              className="max-w-2xl mx-auto"
            />
          </div>
        )}

        {/* Buttons */}
        {quotationData.buttons && quotationData.buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {quotationData.buttons.map((button, index) => {
              const resolvedHref = useResolvedHref({ link: button.link as any });
              
              if (!resolvedHref) {
                return null;
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={resolvedHref}
                    className={buttonVariants({
                      variant: button.type === 'primary' ? 'default' : 'outline',
                      size: 'lg',
                    })}
                  >
                    {button.title}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Testimonial */}
        {quotationData.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-[#B0DEE6]/5 to-[#FFE48C]/5 border border-[#B0DEE6]/20 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              {quotationData.testimonial.author.image?.asset?.url && (
                <div className="flex-shrink-0">
                  <Image
                    src={quotationData.testimonial.author.image.asset.url}
                    alt={quotationData.testimonial.author.image.asset.altText || quotationData.testimonial.author.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <blockquote className="text-[#313E4E]/80 italic text-lg leading-relaxed mb-4">
                  "{quotationData.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-[#368DB1]"></div>
                  <div>
                    <p className="font-semibold text-[#313E4E]">
                      {quotationData.testimonial.author.name}
                    </p>
                    {quotationData.testimonial.author.role && (
                      <p className="text-sm text-[#313E4E]/60">
                        {quotationData.testimonial.author.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
}
