import { CursorClick } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctas',
  title: 'CTAs',
  type: 'document',
  icon: CursorClick,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'CTA',
      title: 'CTA',
      type: 'array',
      of: [
        { type: 'ctaSimple' },
        { type: 'ctaTitleImage' },
        { type: 'ctaWithForm' },
      ],
      validation: (Rule) => Rule.required().max(1).min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
    }),
  },
});
