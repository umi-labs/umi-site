import { groq } from 'next-sanity';
import { link } from '@/sanity/lib/queries/generics/queries.link';

export const cardGrid = groq`
  cardGrid[] {
        ...,
        image{
          ...,
          asset->
        },
        ${link}
      }
`;
