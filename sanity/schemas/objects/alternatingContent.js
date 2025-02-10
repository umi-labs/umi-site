import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'alternatingContent',
  title: 'Alternating Content',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'misc',
      title: 'MISC',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                },
              ],
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
    defineField({
      type: 'boolean',
      name: 'separator',
      title: 'Separator',
      initialValue: true,
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
        subtitle: 'AlternatingContent',
      };
    },
  },
});
