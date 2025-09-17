import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'quotationBlock',
  title: 'Quotation Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quotation',
      title: 'Quotation',
      type: 'reference',
      to: [{ type: 'quotations' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'quotation.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Quotation Block',
        subtitle: 'Quotation Block',
      };
    },
  },
});
