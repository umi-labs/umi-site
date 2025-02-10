import { groq } from 'next-sanity';

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
    blocks[] {
      ...,
      inbox->,
      image{
        ...,
        asset->
      },
      content[] {
        ...,
        image{
          ...,
          asset->
        }
      },
      selectedArchives[]->,
      "archive": *[_type == ^.postType] | order(_createdAt desc)[0..8]{ 
        ..., 
        coverImage {
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
    },
    metaData,
    "postType": *[_type=='postType' && references(^._id)]{
      title,
      "slug": slug.current,
    },
  }
`;
