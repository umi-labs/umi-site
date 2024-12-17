import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    hero[]{
      ...,
      image{
        ...,
        asset->
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
      button {
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
      }
    },
    blocks[] {
      ...,
      image{
        ...,
        asset->
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
      button {
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
      features[] {
        ...,
        button {
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
      testimonials[] {
        ...,
        image{
          ...,
          asset->
        },
      },
      logos[] {
        ...,
        logo {
          ...,
          asset->
        },
        link{
          ...,
          internalLink ->{
            _type,
            "slug": slug.current,
            title,
            postType->
          }
        }
      }
    },
    metaData{
      ...,
      title
    },
    title,
  }
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    hero,
    blocks[]->{
      ...,
      inbox->,
      image{
        ...,
        asset->
      }
    },
    metaData,
    "postType": *[_type=='postType' && references(^._id)]{
      title,
      "slug": slug.current,
    },
    title,
    "slug": slug.current,
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] {
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
