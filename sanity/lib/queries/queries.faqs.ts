import { groq } from 'next-sanity';

export const getFAQsByTypeQuery = groq`
  *[_type == "faq" && $type == tag] {
    ...,
  }
`;
