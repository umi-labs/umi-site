import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    hero,
    blocks,
    metaData,
    title,
  }
`;

// export const getLinkRefResolvedQuery = qroq`
//
// `;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    hero,
    blocks[]->{
      ...,
      inbox->,
    },
    metaData->,
    "postType": *[_type=='postType' && references(^._id)]{
      title,
      "slug": slug.current,
    },
    title,
    "slug": slug.current,
  }
`;

export const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    ...,
    name,
    initials,
    socialLinks[],
    policies[]{
      ...,
      navItemUrl {
        internalLink->{
          ...,
          "slug": slug.current,
          postType->
        }
      }
    },
    footerNav->{
      ...,
      menu[] {
        ...,
        itemsList {
          ...,
          items[] {
            ...,
            navItemUrl {
              ...,
              internalLink-> {
                _type,
                "slug": slug.current,
                title,
                postType->
              }
            }
          }
        },
        items {
          ...,
          navItemUrl {
            ...,
            internalLink-> {
              _type,
              "slug": slug.current,
              title,
              postType->
            }
          }
        },
      }
    },
    mainNav->{
      ...,
      menu[] {
        ...,
        itemsList {
          ...,
          items[] {
            ...,
            navItemUrl {
              ...,
              internalLink-> {
                _type,
                "slug": slug.current,
                title,
                postType->
              }
            }
          }
        },
        items {
          ...,
          navItemUrl {
            ...,
            internalLink-> {
              _type,
              "slug": slug.current,
              title,
              postType->
            }
          }
        },
      }
    },
    customCursor,
    ogImage,
  }
`;

export const seoSettingsQuery = groq`
  *[_type == "seoSettings"][0]{
    metaData,
  }
`;

export const themeSettingsQuery = groq`
  *[_type == "themeSettings"][0]{
    logo,
    favicon {
      favicon32 {
        asset ->
      },
      appleTouchIcon {
        asset ->
      },
      androidChrome192 {
        asset ->
      }
    },
    background,
    foreground,
    accent,
  }
`;
