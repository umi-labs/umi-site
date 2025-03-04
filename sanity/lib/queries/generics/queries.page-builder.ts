import { groq } from 'next-sanity';
import { hero } from '@/sanity/lib/queries/generics/queries.hero';
import { blocks } from '@/sanity/lib/queries/generics/queries.blocks';

export const pageBase = groq`
  _id,
  title,
  "slug": slug.current
`;

export const pageBuilder = groq`
  ${pageBase},
  ${[hero, blocks].join(',')}
`;
