import { defineType } from 'sanity';

export default defineType({
  name: 'quotationBlock',
  title: 'Quotation Block',
  type: 'object',
  fields: [
    {
      name: 'quotation',
      title: 'Quotation',
      type: 'reference',
      to: [{ type: 'quotations' }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'quotation.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Quotation Block',
      };
    },
  },
});
