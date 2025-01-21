import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'contentBlock',
  title: 'Content Block',
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
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'UMI Culture', value: 'umiCulture' },
          { title: 'Standard Video', value: 'standardVideo' },
          { title: 'Standard Image', value: 'standardImage' },
        ],
      },
      group: 'misc',
    }),
    defineField({
      name: 'imageGrid',
      title: 'Image Grid',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
      hidden: ({ parent }) => parent?.type !== 'umiCulture',
      group: 'content',
    }),
    defineField({
      name: 'cardGrid',
      title: 'Card Grid',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
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
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
        }),
      ],
      hidden: ({ parent }) => parent?.type !== 'umiCulture',
      group: 'content',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      hidden: ({ parent }) => parent?.type !== 'standardVideo',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'standardImage',
      group: 'content',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'layout',
      group: 'misc',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: `Content Block`,
      };
    },
  },
});
