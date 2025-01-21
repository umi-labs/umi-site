import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaSimple',
  title: 'CTA Simple',
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
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
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
    defineField({ name: 'buffers', title: 'Buffers', type: 'buffers' }),
    defineField({ name: 'layout', title: 'Layout', type: 'layout' }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'CTA Simple',
      };
    },
  },
});
