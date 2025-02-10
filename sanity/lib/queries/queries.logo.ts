import { groq } from 'next-sanity';

export const getLogosQuery = groq`
  *[_type == "project"] {
    "logo": clientLogo{asset->}
  }
`;
