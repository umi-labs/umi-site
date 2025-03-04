import { groq } from 'next-sanity';

export const teamQuery = groq`
  *[_type == "team"] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    department,
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
    department,
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
    department,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;

export const teamQueryPaginatedInitial = groq`
  *[_type == "team"] | order(_id) [0...9] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    department,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;

export const teamQueryPaginated = groq`
  *[_type == "team" && _id > $lastId] | order(_id) [0...9] {
    ...,
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    role,
    department,
    description,
    image{
      asset->
    },
    metaData->,
  }
`;

export const filterTeamByDepartmentQueryPaginatedInitial = groq`
   *[_type == "team" && defined(department) && department == $department] | order(_id) [0...9] {
      ...,
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      role,
      department,
      description,
      image{
        asset->
      },
      metaData->,
    }
`;

export const filterTeamByDepartmentQueryPaginated = groq`
   *[_type == "team" && defined(department) && department == $department && _id > $lastId] | order(_id) [0...9] {
      ...,
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      role,
      department,
      description,
      image{
        asset->
      },
      metaData->,
    }
`;
