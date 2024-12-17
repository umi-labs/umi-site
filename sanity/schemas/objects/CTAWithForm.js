import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaWithForm',
  title: 'CTA With Form',
  type: 'object',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
    }),
    defineField({
      name: 'topBuffer',
      title: 'Top Buffer',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'bottomBuffer',
      title: 'Bottom Buffer',
      type: 'boolean',
      initialValue: true,
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
