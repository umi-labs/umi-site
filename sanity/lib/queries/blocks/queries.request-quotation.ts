import { groq } from 'next-sanity';
import { buttons } from '@/sanity/lib/queries/generics/queries.button';

export const requestQuotation = groq`
  ...,
  points[] {
    ...,
    icon {
      ...,
      asset->
    }
  },
  form-> {
    _id,
    title,
    formFields[] {
      ...,
      options
    }
  },
  testimonial {
    author-> {
      _id,
      name,
      role,
      image {
        ...,
        asset->
      }
    },
    quote
  },
  ${buttons}
`;
