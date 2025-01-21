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
      selectedProjects[]->{
        ...,
        "slug": slug.current,
        coverImage{
          ...,
          asset->
        },
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
    },
    blocks[] {
      ...,
      inbox->,
      image{
        ...,
        asset->
      },
      imageGrid[]{
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
      cardGrid[]{
        ...,
        image{
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

export const projectsBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tags[],
    clientName,
    clientUrl,
    clientLogo {
      ...,
      asset->
    },
    coverImage{
      ...,
      asset->
    },
    "caseStudyUrl": caseStudy.asset->url,
    body,
    cta{
      ...,
      image{
        ...,
        asset->
      },
      button{
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
    contactForm{
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
      }
    },
    relatedProjects[]->{
      ...,
      "slug": slug.current,
      coverImage{
        ...,
        asset->
      },
      tags,
      projectName,
      clientName,
      clientUrl,
      clientLogo {
        ...,
        asset->
      },
      description->,
      coverImage{
        ...,
        asset->
      }
    },
    metaData,
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
    secondaryAccent,
  }
`;
