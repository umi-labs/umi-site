import { groq } from 'next-sanity';

export const getReviewsQuery = groq`
  *[_type == "review"] {
    ...,
    image{
      ...,
      asset->
    },
  }
`;

export const getFeaturedReviewsQuery = groq`
  *[_type == "review" && featured == true] {
    ...,
    image{
      ...,
      asset->
    },
  }
`;
