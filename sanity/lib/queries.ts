import { groq } from 'next-sanity';
import { buttons, pageBase, pageBuilder } from '@/sanity/lib/queries/generics';

export const homePageQuery = groq`
      *[_type == "home"][0]{
            ...,
            ${pageBuilder},
            metaData,
      }
`;

export const pagesBySlugQuery = groq`
      *[_type == "page" && slug.current == $slug][0] {
            ...,
            ${pageBuilder},
            metaData,
            "postType": *[_type=='postType' && references(^._id)]{
                  title,
                  "slug": slug.current,
            },
      }
`;

export const projectsBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${pageBase},
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
      ${buttons},
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
    ${pageBase},
    featured,
    type,
    tags[],
    excerpt,
    author->{
      ...,
      "slug": slug.current,
      image{
        ...,
        asset->
      },
      role,
      description,
      socialLinks[]{
        title,
        socialMedia,
        link
      }
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
            "title": title,
            "navLinks": linksList[] {
              _key,
              displayExternal,
              "title": link.title,
              "slug": link.internalLink->slug.current,
              "hasParent": link.internalLink->hasParent,
              "parentSlug": link.internalLink->parent.parentSlug,
              "type": link.internalLink->_type,
            }
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
