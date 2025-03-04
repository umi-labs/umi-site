import { groq } from 'next-sanity';
import { button, buttons } from '@/sanity/lib/queries/generics/queries.button';

export const hero = groq`
  hero[]{
    ...,
    image{
      ...,
      asset->
    },
    video{
      ...,
      video{
        ..., 
        asset->
      },
      image{
        ...,
        asset->
      },
    },
    ${[buttons, button].join(',')}
  }
`;
