import { groq } from 'next-sanity';
import { buttons } from '@/sanity/lib/queries/generics/queries.button';

export const cta = groq`
  cta-> {
    CTA[] {
      ...,
      image {
        ...,
        asset->
      },
      ${buttons}
    },
  }
`;
