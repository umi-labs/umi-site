import { groq } from 'next-sanity';

export const quotationBlock = groq`
  quotation-> {
    _id,
    title,
    quotation[] {
      _type,
      separator,
      subtitle,
      title,
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
      },
      points[] {
        _type,
        icon {
          type,
          weight
        },
        content
      },
      form-> {
        _id,
        title,
        formFields[] {
          ...,
          options
        }
      },
      buttons[] {
        title,
        type,
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
      },
      testimonial {
        author-> {
          _id,
          name,
          role,
          image {
            ...,
            asset->
          }
        },
        quote
      }
    }
  }
`;
