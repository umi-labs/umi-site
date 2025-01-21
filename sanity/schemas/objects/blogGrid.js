import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blogGrid',
  title: 'Blog Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'separator',
      title: 'Separator',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Blog Grid',
      };
    },
  },
});
