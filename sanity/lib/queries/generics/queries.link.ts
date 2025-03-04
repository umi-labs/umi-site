import { groq } from 'next-sanity';

export const link = groq`
    link {
        "type": internalLink->_type,
        "slug": internalLink->slug.current,
        "title": internalLink->title,
        "hasParent": internalLink->hasParent,
        "parentSlug": internalLink->parent.parentSlug,
        displayExternal,
        "url": externalUrl
    }
`;
