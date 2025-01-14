import { groq } from 'next-sanity';

export const getJobsQuery = groq`
  *[_type == "job"] {
    ...,
    "slug": slug.current,
  }
`;

export const getFeaturedJobsQuery = groq`
  *[_type == "job" && featured == true] {
    ...,
    "slug": slug.current,
  }
`;
