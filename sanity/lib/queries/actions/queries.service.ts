import { groq } from 'next-sanity';
import { blocks } from '@/sanity/lib/queries/generics/queries.blocks';

export const servicesBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    hero[]{
      ...,
      image{
        ...,
        asset->
      },
      video{
        ...,
        video{
          ..., 
          asset->
        },
        image{
          ...,
          asset->
        },
      },
      buttons[] {
        ...,
        link{
          ...,
          internalLink ->{
            _type,
            "slug": slug.current,
            title,
            postType->
          }
        }
      },
    },
    ${blocks},
    metaData,
    "postType": *[_type=='postType' && references(^._id)]{
      title,
      "slug": slug.current,
    },
  }
`;
