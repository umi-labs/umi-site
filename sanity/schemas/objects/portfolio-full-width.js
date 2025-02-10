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
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
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
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Portfolio Full Width',
      };
    },
  },
});
