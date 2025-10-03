import { groq } from 'next-sanity';
import { cardGrid, cta, form, logos } from '@/sanity/lib/queries/blocks';
import { quotationBlock } from '@/sanity/lib/queries/blocks/queries.quotation-block';
import { button, buttons } from '@/sanity/lib/queries/generics/queries.button';

export const blocks = groq`
  blocks[] {
    ...,
    // Basic content blocks
    _type == "textBlock" => {
      ...,
      content[] {
        ...,
        _type == "block" => {
          ...,
          children[] {
            ...,
            _type == "span" => {
              ...,
              marks[],
              text
            }
          }
        }
      }
    },
    _type == "contentBlock" => {
      ...,
      content[] {
        ...,
        _type == "block" => {
          ...,
          children[] {
            ...,
            _type == "span" => {
              ...,
              marks[],
              text
            }
          }
        }
      }
    },
    _type == "imageWithText" => {
      ...,
      images[] {
        ...,
        asset->
      }
    },
    
    // Form blocks
    _type == "formBlock" => {
      ...,
      form-> {
        ...,
        formFields[] {
          ...,
          options
        }
      }
    },
    _type == "contactFormBlock" => {
      ...,
      form-> {
        ...,
        formFields[] {
          ...,
          options
        }
      }
    },
    
    // CTA blocks
    _type == "ctaBlock" => {
      ...,
      cta-> {
        ...,
        CTA[] {
          ...,
          image {
            ...,
            asset->
          },
          buttons[] {
            ...,
            link {
              ...,
              internalLink-> {
                _type,
                title,
                slug {
                  current
                }
              }
            }
          }
        }
      }
    },
    _type == "ctaSimple" => {
      ...,
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    _type == "ctaTitleImage" => {
      ...,
      image {
        ...,
        asset->
      },
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    _type == "ctaWithForm" => {
      ...,
      form-> {
        ...,
        formFields[] {
          ...,
          options
        }
      },
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    
    // Grid and layout blocks
    _type == "featureGrid" => {
      ...,
      features[] {
        ...,
        icon {
          type,
          weight
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    _type == "cardGridSideTitle" => {
      ...,
      cards[] {
        ...,
        image {
          ...,
          asset->
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    _type == "cardGridSideTitleSimple" => {
      ...,
      cards[] {
        ...,
        image {
          ...,
          asset->
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    _type == "portfolioFullWidth" => {
      ...,
      projects[] {
        ...,
        coverImage {
          ...,
          asset->
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    
    // Content blocks
    _type == "alternatingContent" => {
      ...,
      items[] {
        ...,
        image {
          ...,
          asset->
        },
        content[] {
          ...,
          _type == "block" => {
            ...,
            children[] {
              ...,
              _type == "span" => {
                ...,
                marks[],
                text
              }
            }
          }
        }
      }
    },
    _type == "meetTheTeam" => {
      ...,
      teamMembers[]-> {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    _type == "testimonialsCarousel" => {
      ...,
      testimonials[]-> {
        ...,
        author-> {
          ...,
          image {
            ...,
            asset->
          }
        }
      }
    },
    _type == "carousel" => {
      ...,
      items[] {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    _type == "logoCloud" => {
      ...,
      logos[] {
        ...,
        asset->
      }
    },
    _type == "blogGrid" => {
      ...,
      posts[]-> {
        ...,
        coverImage {
          ...,
          asset->
        },
        author-> {
          ...,
          image {
            ...,
            asset->
          }
        }
      }
    },
    
    // FAQ and job blocks
    _type == "faqBlock" => {
      ...,
      faqs[]-> {
        ...,
        answer[] {
          ...,
          _type == "block" => {
            ...,
            children[] {
              ...,
              _type == "span" => {
                ...,
                marks[],
                text
              }
            }
          }
        }
      }
    },
    _type == "jobVacancies" => {
      ...,
      jobs[]-> {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    
    // Archive blocks
    _type == "archiveBlock" => {
      ...,
      selectedArchives[]-> {
        ...,
        coverImage {
          ...,
          asset->
        }
      }
    },
    
    // Hero blocks
    _type == "heroWithMedia" => {
      ...,
      image {
        ...,
        asset->
      },
      video {
        ...,
        video {
          ...,
          asset->
        },
        image {
          ...,
          asset->
        }
      },
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    
    // Quotation block
    _type == "quotationBlock" => {
      ${quotationBlock}
    },
    
    // Legacy support for existing blocks
    features[] {
      ...,
      ${button}
    },
    inbox->,
    image {
      ...,
      asset->
    },
    imageGrid[] {
      asset->
    },
    faqs[]->,
    video {
      ...,
      video {
        ...,
        asset->
      },
      image {
        ...,
        asset->
      }
    },
    content[] {
      ...,
      image {
        ...,
        asset->
      }
    },
    selectedArchives[]->,
    "archive": *[_type == ^.postType] | order(_createdAt desc)[0..8] {
      ...,
      coverImage {
        ...,
        asset->
      },
      "slug": slug.current,
      author-> {
        ...,
        "slug": slug.current
      },
      time {
        ...,
        timeTaken,
        timeType
      }
    }
  }
`;

// Comprehensive blocks query that includes ALL available block types
export const comprehensiveBlocks = groq`
  blocks[] {
    ...,
    // Basic content blocks
    _type == "textBlock" => {
      ...,
      content[] {
        ...,
        _type == "block" => {
          ...,
          children[] {
            ...,
            _type == "span" => {
              ...,
              marks[],
              text
            }
          }
        }
      }
    },
    _type == "contentBlock" => {
      ...,
      content[] {
        ...,
        _type == "block" => {
          ...,
          children[] {
            ...,
            _type == "span" => {
              ...,
              marks[],
              text
            }
          }
        }
      }
    },
    _type == "imageWithText" => {
      ...,
      images[] {
        ...,
        asset->
      }
    },
    
    // Form blocks
    _type == "formBlock" => {
      ...,
      form-> {
        ...,
        formFields[] {
          ...,
          options
        }
      }
    },
    _type == "contactFormBlock" => {
      ...,
      form-> {
        ...,
        formFields[] {
          ...,
          options
        }
      }
    },
    
    // CTA blocks
    _type == "ctaBlock" => {
      ...,
      cta-> {
        ...,
        CTA[] {
          ...,
          image {
            ...,
            asset->
          },
          buttons[] {
            ...,
            link {
              ...,
              internalLink-> {
                _type,
                title,
                slug {
                  current
                }
              }
            }
          }
        }
      }
    },
    _type == "ctaSimple" => {
      ...,
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    _type == "ctaTitleImage" => {
      ...,
      image {
        ...,
        asset->
      },
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    _type == "ctaWithForm" => {
      ...,
      form-> {
        ...,
        formFields[] {
          ...,
          options
        }
      },
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    
    // Grid and layout blocks
    _type == "featureGrid" => {
      ...,
      features[] {
        ...,
        icon {
          type,
          weight
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    _type == "cardGridSideTitle" => {
      ...,
      cards[] {
        ...,
        image {
          ...,
          asset->
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    _type == "cardGridSideTitleSimple" => {
      ...,
      cards[] {
        ...,
        image {
          ...,
          asset->
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    _type == "portfolioFullWidth" => {
      ...,
      projects[] {
        ...,
        coverImage {
          ...,
          asset->
        },
        buttons[] {
          ...,
          link {
            ...,
            internalLink-> {
              _type,
              title,
              slug {
                current
              }
            }
          }
        }
      }
    },
    
    // Content blocks
    _type == "alternatingContent" => {
      ...,
      items[] {
        ...,
        image {
          ...,
          asset->
        },
        content[] {
          ...,
          _type == "block" => {
            ...,
            children[] {
              ...,
              _type == "span" => {
                ...,
                marks[],
                text
              }
            }
          }
        }
      }
    },
    _type == "meetTheTeam" => {
      ...,
      teamMembers[]-> {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    _type == "testimonialsCarousel" => {
      ...,
      testimonials[]-> {
        ...,
        author-> {
          ...,
          image {
            ...,
            asset->
          }
        }
      }
    },
    _type == "carousel" => {
      ...,
      items[] {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    _type == "logoCloud" => {
      ...,
      logos[] {
        ...,
        asset->
      }
    },
    _type == "blogGrid" => {
      ...,
      posts[]-> {
        ...,
        coverImage {
          ...,
          asset->
        },
        author-> {
          ...,
          image {
            ...,
            asset->
          }
        }
      }
    },
    
    // FAQ and job blocks
    _type == "faqBlock" => {
      ...,
      faqs[]-> {
        ...,
        answer[] {
          ...,
          _type == "block" => {
            ...,
            children[] {
              ...,
              _type == "span" => {
                ...,
                marks[],
                text
              }
            }
          }
        }
      }
    },
    _type == "jobVacancies" => {
      ...,
      jobs[]-> {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    
    // Archive blocks
    _type == "archiveBlock" => {
      ...,
      selectedArchives[]-> {
        ...,
        coverImage {
          ...,
          asset->
        }
      }
    },
    
    // Hero blocks
    _type == "heroWithMedia" => {
      ...,
      image {
        ...,
        asset->
      },
      video {
        ...,
        video {
          ...,
          asset->
        },
        image {
          ...,
          asset->
        }
      },
      buttons[] {
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            title,
            slug {
              current
            }
          }
        }
      }
    },
    
    // Quotation block
    _type == "quotationBlock" => {
      ${quotationBlock}
    },
    
    // Legacy support for existing blocks
    features[] {
      ...,
      ${button}
    },
    inbox->,
    image {
      ...,
      asset->
    },
    imageGrid[] {
      asset->
    },
    faqs[]->,
    video {
      ...,
      video {
        ...,
        asset->
      },
      image {
        ...,
        asset->
      }
    },
    content[] {
      ...,
      image {
        ...,
        asset->
      }
    },
    selectedArchives[]->,
    "archive": *[_type == ^.postType] | order(_createdAt desc)[0..8] {
      ...,
      coverImage {
        ...,
        asset->
      },
      "slug": slug.current,
      author-> {
        ...,
        "slug": slug.current
      },
      time {
        ...,
        timeTaken,
        timeType
      }
    }
  }
`;
