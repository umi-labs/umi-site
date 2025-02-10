import { Browser } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: Browser,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'misc',
      title: 'MISC',
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'hasParent', title: 'Has Parent', type: 'boolean' }),
    defineField({
      name: 'parent',
      title: 'Parent',
      type: 'object',
      fields: [
        {
          name: 'parentSlug',
          type: 'string',
          validation: (rule) => rule.regex(/^(?!-)((?:[a-z0-9]+-?)+)(?<!-)$/gm),
        },
        { name: 'parentPage', type: 'reference', to: [{ type: 'page' }] },
      ],
      hidden: ({ parent }) => !parent.hasParent,
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heros',
      group: 'content',
    }),
    defineField({
      name: 'blocks',
      description: 'Used to add components to the page',
      title: 'Blocks',
      type: 'blocks',
      group: 'content',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
    defineField({
      name: 'postType',
      type: 'reference',
      to: [{ type: 'postType' }],
      group: 'misc',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      };
    },
  },
});
