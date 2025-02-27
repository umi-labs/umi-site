import { Files, ImageSquare } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: Files,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your post.',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Podcast', value: 'podcast' },
          { title: 'Blog', value: 'blog' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tag',
          title: 'Tag',
          type: 'string',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'team' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. If you choose to add it to the show case work, this is the image displayed in the list within the homepage.',
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
          type: 'imageWithText',
          name: 'imageWithText',
          title: 'Image With Text',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'image.asset.url',
              title: 'title',
              description: 'content',
            },
          },
        }),
        defineField({
          type: 'faqBlock',
          name: 'faqBlock',
          title: 'FAQ Block',
        }),
        defineField({
          type: 'basicHero',
          name: 'basicHero',
          title: 'Basic Hero',
        }),
        defineField({
          type: 'heroWithMedia',
          name: 'heroWithMedia',
          title: 'Hero With Media',
        }),
        defineField({
          type: 'logoCloud',
          name: 'logoCloud',
          title: 'Logo Cloud',
        }),
        defineField({
          type: 'alternatingContent',
          name: 'alternatingContent',
          title: 'Alternating Content',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
  ],
});
