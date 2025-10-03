import { defineType } from 'sanity';

export default defineType({
  name: 'quotations',
  title: 'Quotations',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quotation',
      title: 'Quotation Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'requestQuotation' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
