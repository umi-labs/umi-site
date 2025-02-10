'use client';
import React, { useState } from 'react';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/_components/ui/accordion';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import type { PortableTextBlock } from 'next-sanity';
import { useQuery } from '@tanstack/react-query';
import { FAQPayload, getFAQsByType } from '@/app/_actions/faqs';

interface Props {
  data: {
    separator?: boolean | undefined;
    title: string;
    subtitle?: string | undefined;
    description?: PortableTextBlock[] | undefined;
    manual: boolean;
    faqs: FAQPayload[];
  };
  tag?: string;
}

export default function FAQs({ data, tag = 'advertising' }: Props) {
  const [faqs, setFaqs] = useState<FAQPayload[]>(data.faqs);

  const { data: faqsArray } = useQuery({
    queryKey: ['faqs', tag],
    queryFn: () => getFAQsByType({ type: tag }),
  });

  React.useEffect(() => {
    if (!faqsArray && !data.manual) return;
    setFaqs(faqsArray!);
  }, [faqsArray]);

  return (
    <section className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-24 px-10 py-10 md:py-32">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
        {data.subtitle && (
          <h4 className="font-semibold text-gray-600">{data.subtitle}</h4>
        )}
        {data.description && <CustomPortableText value={data.description} />}
      </div>
      {faqs && faqs.length > 0 && (
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col items-center justify-center"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              className="flex w-full flex-col"
              value={`item-${i}`}
            >
              <AccordionTrigger className="flex items-center justify-between gap-x-4 bg-[#FAFAFA] px-4 text-left transition-all duration-300 ease-in-out data-[state=open]:bg-primary-background data-[state=open]:text-primary-accent">
                <h3 className="text-2xl font-semibold">{faq.question}</h3>
                {/*<CaretDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />*/}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <CustomPortableText value={faq.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
}
