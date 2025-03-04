import { groq } from 'next-sanity';

export const getPostTagsAndTypesQuery = groq`
  *[_type == "post"] {
    tags,
    type,
  }
`;

export const getPostsByAuthorQuery = groq`
  *[_type == "post" && author->slug.current == $slug] | order(_createdAt desc) {
    ...,
    "slug": slug.current,
    coverImage{
      ...,
      asset->
    },
    author->{
          ...,
          "slug": slug.current,
        },
        time{
          ...,
          timeTaken,
          timeType
        }
  }
`;

export const getPaginatedPostsQuery = groq`
  *[_type == "project" && (_createdAt > $lastCreatedAt || (_createdAt == $lastCreatedAt && _id > $lastId) )] | order(_createdAt desc) [0..8]{
    ...,
    coverImage{
      ...,
      asset->
    },
    "slug": slug.current,
    author->{
          ...,
          "slug": slug.current,
        },
        time{
          ...,
          timeTaken,
          timeType
        }
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(_createdAt desc) [0..2] {
    ...,
    "slug": slug.current,
    coverImage{
      ...,
      asset->
    },
    author-> {
      name,
      "slug": slug.current
    }
  }
`;

export const getPostsQuery = groq`
  *[_type == "post"] | order(_createdAt desc) [0..8]{
    ...,
    coverImage{
      ...,
      asset->
    },
    "slug": slug.current,
    author->{
          ...,
          "slug": slug.current,
        },
        time{
          ...,
          timeTaken,
          timeType
        }
  }
`;

export const getFilteredByTypePostsQuery = groq`
  *[_type == "post" && type == $type] | order(_createdAt desc) [0..8]{
    ...,
    "slug": slug.current,
    coverImage{
      ...,
      asset->
    },
    author->{
      ...,
      "slug": slug.current,
    },
    time{
      ...,
      timeTaken,
      timeType
    }
  }
`;

export const getFilteredByTagPostsQuery = groq`
  *[_type == "post" && $tag in tags] | order(_createdAt desc) [0..8]{
    ...,
    "slug": slug.current,
    coverImage{
      ...,
      asset->
    },
    author->{
      ...,
      "slug": slug.current,
    },
    time{
      ...,
      timeTaken,
      timeType
    }
  }
`;

export const getFullyFilteredPostsQuery = groq`
  *[_type == "post" && $tag in tags && type == $type] | order(_createdAt desc) [0..8]{
    ...,
    "slug": slug.current,
    coverImage{
      ...,
      asset->
    },
    author->{
      ...,
      "slug": slug.current,
    },
    time{
      ...,
      timeTaken,
      timeType
    }
  }
`;
