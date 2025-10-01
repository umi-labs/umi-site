import { groq } from 'next-sanity';
import { cardGrid, cta, form, logos } from '@/sanity/lib/queries/blocks';
import { button, buttons } from '@/sanity/lib/queries/generics/queries.button';

export const blocks = groq`
  blocks[] {
      ...,
      ${[form, cta, logos, cardGrid, buttons, button].join(',')},
      features[] {
            ...,
            ${button},
      },
      inbox->,
      image{
        ...,
        asset->
      },
      imageGrid[]{
        asset->
      },
      faqs[]->,
      video {
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
    }
`;
