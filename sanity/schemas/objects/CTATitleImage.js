import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaTitleImage',
  title: 'CTA Title Image',
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
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'point',
          title: 'Point',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'icon',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'string',
            }),
          ],
        }),
      ],
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        subtitle: subtitle,
        title,
      };
    },
  },
});
