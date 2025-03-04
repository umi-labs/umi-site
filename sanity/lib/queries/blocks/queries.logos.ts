import { groq } from 'next-sanity';
import { link } from '@/sanity/lib/queries/generics/queries.link';

export const logos = groq`
        logos[]{
                ...,
                name,
                logo {
                        ...,
                        asset->
                },
                ${link}
        }
`;
