import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'portfolioFullWidth',
  title: 'Portfolio Full Width',
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
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'button',
          title: 'Button',
          type: 'button',
        }),
      ],
    }),
    defineField({
      name: 'buffers',
      title: 'Buffers',
      type: 'buffers',
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
