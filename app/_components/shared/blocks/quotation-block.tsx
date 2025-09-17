import React from 'react';
import RequestQuotation from '@/app/_components/shared/blocks/request-quotation';

interface Props {
  data: {
    quotation: {
      quotation: Array<{
        _type: 'requestQuotation';
        separator?: boolean;
        subtitle?: string;
        title?: string;
        content?: any[];
        points?: Array<{
          icon: {
            type: 'eye' | 'rocket' | 'clock' | 'headphones' | 'check' | 'check-circle' | 'facebook' | 'twitter' | 'instagram' | 'linkedin';
            weight: 'fill' | 'bold' | 'light' | 'thin' | 'regular' | 'duotone';
          };
          content: string;
        }>;
        form?: {
          _id: string;
          title: string;
          formFields: any[];
          email: string;
          subject: string;
          submitButtonLabel: string;
          confirmationMessage: any[];
          confirmationType: 'message' | 'redirect';
          redirect: string;
          _key: string;
          fields: any[];
          uid: string;
        };
        buttons?: Array<{
          title: string;
          type: 'link' | 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link-external' | 'link-interactive' | 'link-light' | 'gradient' | 'bounce' | 'glow' | 'shimmer' | 'pulse';
          link: {
            title: string;
            displayExternal: boolean;
            internalLink?: any;
            externalUrl?: string;
            _key: string;
            slug: string;
            hasParent: boolean;
            type: string;
          };
        }>;
        testimonial?: {
          author?: {
            _id: string;
            name: string;
            role?: string;
            image?: {
              asset?: {
                url: string;
              };
            };
          };
          quote?: string;
        };
      }>;
    };
  };
}

export default function QuotationBlock({ data }: Props) {
  console.log('QuotationBlock full data:', data);
  
  // The data structure is: { quotation: { quotation: [...] } }
  const quotationData = data?.quotation?.quotation?.[0] || null;
  
  console.log('QuotationBlock quotationData:', quotationData);

  if (!quotationData) {
    console.log('QuotationBlock: No quotation data found');
    return <div>No quotation data found</div>;
  }

  return <RequestQuotation data={quotationData} />;
}
