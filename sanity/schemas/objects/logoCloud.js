import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'logoCloud',
  title: 'Logo Cloud',
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
      name: 'manual',
      title: 'Manual',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'logo',
          title: 'Logo',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Logo Cloud',
      };
    },
  },
});
