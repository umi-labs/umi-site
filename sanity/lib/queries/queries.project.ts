import { groq } from 'next-sanity';

export const getFilteredProjectsQuery = groq`
  *[_type == "project" && $tag in tags] | order(_createdAt desc) [0..8]{
    ...,
    coverImage{
      ...,
      asset->
    },
    "slug": slug.current,
  }
`;

export const getFeaturedProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) [0..8]{
    ...,
    coverImage{
      ...,
      asset->
    },
    "slug": slug.current,
  }
`;

export const getProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) [0..8]{
    ...,
    coverImage{
      ...,
      asset->
    },
    "slug": slug.current,
  }
`;

export const getProjectTagsQuery = groq`
  *[_type == "project"] {
    tags,
  }
`;

export const getPaginatedProjectsQuery = groq`
  *[_type == "project" && (_createdAt > $lastCreatedAt || (_createdAt == $lastCreatedAt && _id > $lastId) )] | order(_createdAt desc) [0..8]{
    ...,
    coverImage{
      ...,
      asset->
    },
    "slug": slug.current,
  }
`;
