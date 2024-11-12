import { defineField, defineType } from 'sanity';
import { NavigationArrow } from '@phosphor-icons/react';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: NavigationArrow,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Text',
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
