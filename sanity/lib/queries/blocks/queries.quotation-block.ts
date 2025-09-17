import { groq } from 'next-sanity';
import { requestQuotation } from '@/sanity/lib/queries/blocks/queries.request-quotation';

export const quotationBlock = groq`
  quotation-> {
    _id,
    title,
    quotation[] {
      ${requestQuotation}
    }
  }
`;
