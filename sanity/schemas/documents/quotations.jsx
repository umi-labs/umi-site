import { CursorClick } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'quotations',
  title: 'Quotations',
  type: 'document',
  icon: CursorClick,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quotation',
      title: 'Quotation',
      type: 'array',
      of: [
        { type: 'requestQuotation' },
      ],
      validation: (Rule) => Rule.required().max(1).min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled Quotation',
    }),
  },
});
