import { groq } from 'next-sanity';

export const teamQuery = groq`
  *[_type == "team"] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;

export const teamBySlugQuery = groq`
  *[_type == "team" && slug.current == $slug][0] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;

export const relatedTeamBySlugQuery = groq`
  *[_type == "team" && slug.current != $slug] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;

export const teamRolesQuery = groq`
  *[_type == "team" && defined(role)] {
    role,
  }
`;

export const filterTeamByRoleQuery = groq`
  *[_type == "team" && defined(role) && role == $role] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;
