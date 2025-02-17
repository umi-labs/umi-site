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
        _key,
        title,
        type,
        link {
         "type": internalLink->_type,
         "slug": internalLink->slug.current,
         "title": internalLink->title,
         "hasParent": internalLink->hasParent,
         "parentSlug": internalLink->parent.parentSlug,
         displayExternal,
         "url": externalUrl
       }
      },
      button {
        _key,
        title,
        type,
        link {
         "type": internalLink->_type,
         "slug": internalLink->slug.current,
         "title": internalLink->title,
         "hasParent": internalLink->hasParent,
         "parentSlug": internalLink->parent.parentSlug,
         displayExternal,
         "url": externalUrl
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
        _key,
        title,
        type,
        link {
         "type": internalLink->_type,
         "slug": internalLink->slug.current,
         "title": internalLink->title,
         "hasParent": internalLink->hasParent,
         "parentSlug": internalLink->parent.parentSlug,
         displayExternal,
         "url": externalUrl
        }
      },
      button {
        _key,
        title,
        type,
        link {
         "type": internalLink->_type,
         "slug": internalLink->slug.current,
         "title": internalLink->title,
         "hasParent": internalLink->hasParent,
         "parentSlug": internalLink->parent.parentSlug,
         displayExternal,
         "url": externalUrl
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
          _key,
          title,
          type,
          link {
           "type": internalLink->_type,
           "slug": internalLink->slug.current,
           "title": internalLink->title,
           "hasParent": internalLink->hasParent,
           "parentSlug": internalLink->parent.parentSlug,
           displayExternal,
           "url": externalUrl
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
        link {
         "type": internalLink->_type,
         "slug": internalLink->slug.current,
         "title": internalLink->title,
         "hasParent": internalLink->hasParent,
         "parentSlug": internalLink->parent.parentSlug,
         displayExternal,
         "url": externalUrl
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
      buttons[] {
        _key,
        title,
        type,
        link {
          "type": internalLink->_type,
          "slug": internalLink->slug.current,
          "title": internalLink->title,
          "hasParent": internalLink->hasParent,
          "parentSlug": internalLink->parent.parentSlug,
          displayExternal,
          "url": externalUrl
        }
      },
      button {
        _key,
        title,
        type,
        link {
          "type": internalLink->_type,
          "slug": internalLink->slug.current,
          "title": internalLink->title,
          "hasParent": internalLink->hasParent,
          "parentSlug": internalLink->parent.parentSlug,
          displayExternal,
          "url": externalUrl
        }
      }
    },
    blocks[] {
      ...,
      inbox->,
      image{
        ...,
        asset->
      },
      cta-> {
        CTA[] {
          ...,
          image {
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
      },
      imageGrid[]{
        asset->
      },
      logos[]{
        ...,
        name,
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
      },
      faqs[]->,
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

export const postsBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    featured,
    type,
    tags[],
    excerpt,
    author->{
      ...,
      "slug": slug.current,
    },
    coverImage{
      ...,
      asset->
    },
    body,
    metaData,
  }
`;

export const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    ...,
    name,
    initials,
    socialLinks[],
    policies[] {
      _key,
      displayExternal,
      "title": internalLink->title,
      "slug": internalLink->slug.current,
      "hasParent": internalLink->hasParent,
      "parentSlug": internalLink->parent.parentSlug,
      "type": internalLink->_type,
    },
    footerNav->{
      menu[] {
        _key,
        title,
        subNavigation,
        "detailed": detailedList,
        subNavigation == "none" => {
          "nav": items {
            _key,
            displayExternal,
            "title": internalLink->title,
            "slug": internalLink->slug.current,
            "hasParent": internalLink->hasParent,
            "parentSlug": internalLink->parent.parentSlug,
            "type": internalLink->_type,
          } 
        },
        subNavigation == "manual" && detailedList == false => {
          "nav": itemsList[] {
            _key,
            displayExternal,
            "title": link.internalLink->title,
            "slug": link.internalLink->slug.current,
            "hasParent": link.internalLink->hasParent,
            "parentSlug": link.internalLink->parent.parentSlug,
            "type": link.internalLink->_type,
          } 
        },
        subNavigation == "manual" && detailedList == true => {
          "nav": detailedItemsList[] {
            _key,
            displayExternal,
            "description": subItemDescription,
            "title": link.internalLink->title,
            "slug": link.internalLink->slug.current,
            "hasParent": link.internalLink->hasParent,
            "parentSlug": link.internalLink->parent.parentSlug,
            "type": link.internalLink->_type,
          } 
        },
        subNavigation == "collection" && detailedList == true => {
          "nav": *[_type == ^.collection] {
            _key,
            "description": hero[0].content[0].children[0].text,
            "title": title,
            "slug": slug.current,
            "type": _type,
          },
        },
        subNavigation == "collection" && detailedList == false => {
          "nav": *[_type == ^.collection] {
            _key,
            "title": title,
            "slug": slug.current,
            "type": _type,
          },
        },
      }
    },
    mainNav-> {
      ctaButton,
      menu[] {
        _key,
        title,
        subNavigation,
        "detailed": detailedList,
        subNavigation == "none" => {
          "nav": items {
            _key,
            displayExternal,
            "title": internalLink->title,
            "slug": internalLink->slug.current,
            "hasParent": internalLink->hasParent,
            "parentSlug": internalLink->parent.parentSlug,
            "type": internalLink->_type,
          } 
        },
        subNavigation == "manual" && detailedList == false => {
          "nav": itemsList[] {
            _key,
            displayExternal,
            "title": link.internalLink->title,
            "slug": link.internalLink->slug.current,
            "hasParent": link.internalLink->hasParent,
            "parentSlug": link.internalLink->parent.parentSlug,
            "type": link.internalLink->_type,
          } 
        },
        subNavigation == "manual" && detailedList == true => {
          "nav": detailedItemsList[] {
            _key,
            displayExternal,
            "description": subItemDescription,
            "title": link.internalLink->title,
            "slug": link.internalLink->slug.current,
            "hasParent": link.internalLink->hasParent,
            "parentSlug": link.internalLink->parent.parentSlug,
            "type": link.internalLink->_type,
          } 
        },
        subNavigation == "collection" && detailedList == true => {
          "nav": *[_type == ^.collection] {
            _key,
            "description": hero[0].content[0].children[0].text,
            "title": title,
            "slug": slug.current,
            "type": _type,
          },
        },
        subNavigation == "collection" && detailedList == false => {
          "nav": *[_type == ^.collection] {
            _key,
            "title": title,
            "slug": slug.current,
            "type": _type,
          },
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
