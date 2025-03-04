import { groq } from 'next-sanity';
import { link } from '@/sanity/lib/queries/generics/queries.link';

export const button = groq`
  button {
    _key,
    title,
    type,
    ${link}
  }
`;

export const buttons = groq`
  buttons[] {
    _key,
    title,
    type,
    ${link}
  }
`;
