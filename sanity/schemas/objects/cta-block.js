import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'reference',
      to: [{ type: 'ctas' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'CTA Block',
      };
    },
  },
});
