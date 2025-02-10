import { Files, ImageSquare } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: Files,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'clientDetails',
      title: 'Client Details',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your project.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tag',
          title: 'Tag',
          type: 'string',
          options: {
            list: [
              { title: 'Advertising', value: 'advertising' },
              { title: 'Development', value: 'development' },
              { title: 'Design', value: 'design' },
              { title: 'Consulting', value: 'consulting' },
              { title: 'Umi Flow', value: 'umi-flow' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'Used for the <meta> description tag for SEO and some cards.',
      group: 'seo',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      group: 'clientDetails',
    }),
    defineField({
      name: 'clientUrl',
      title: 'Client URL',
      type: 'url',
      group: 'clientDetails',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'file',
      group: 'clientDetails',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      group: 'clientDetails',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. Please use a 16:9 aspect ratio.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
        // Custom components
        defineField({
          type: 'image',
          icon: ImageSquare,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        defineField({
          name: 'faqBlock',
          type: 'faqBlock',
          title: 'FAQ Block',
        }),
        defineField({
          name: 'portfolioFullWidth',
          title: 'Portfolio Full Width',
          type: 'portfolioFullWidth',
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'ctaSimple',
          group: 'content',
        }),
        defineField({
          name: 'contactForm',
          title: 'Contact Form',
          type: 'ctaTitleImage',
          group: 'content',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          name: 'relatedProject',
          title: 'Related Project',
          to: [{ type: 'project' }],
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'reference',
      to: [{ type: 'review' }],
      group: 'clientDetails',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
  ],
});
