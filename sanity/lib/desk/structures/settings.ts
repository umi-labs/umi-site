import {
  Gear,
  NavigationArrow,
  Palette,
  Sliders,
  Target,
} from '@phosphor-icons/react';
import { Forms } from '@/sanity/lib/desk/structures/forms';

export const Settings = (S) =>
  S.listItem()
    .title('Settings')
    .icon(Sliders)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('Site Settings')
            .icon(Gear)
            .child(
              S.document().schemaType('siteSettings').title('Site Settings')
            ),
          S.listItem()
            .title('Theme Settings')
            .icon(Palette)
            .child(
              S.document().schemaType('themeSettings').title('Theme Settings')
            ),
          S.listItem()
            .title('SEO Settings')
            .icon(Target)
            .child(
              S.document().schemaType('seoSettings').title('SEO Settings')
            ),
          S.listItem()
            .title('Navigation')
            .icon(NavigationArrow)
            .child(S.document().schemaType('navigation').title('Navigation')),
          S.divider(),
          S.documentTypeListItem('form').title('Forms'),
          // S.documentTypeListItem('postType')
          //   .title('Modify Post Types')
          //   .icon(Browsers),
          S.documentTypeListItem('faq').title('FAQs'),
          S.documentTypeListItem('ctas').title('CTAs'),
        ]),
      S.divider()
    );
