import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero1',
  title: 'Hero1',
  type: 'object',
  fields: [
    defineField({
      name: 'data',
      title: 'Data',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'textAlignHoz',
      title: 'TextAlignHoz',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
    }),
    defineField({
      name: 'textAlignVer',
      title: 'TextAlignVer',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Tertiary', value: 'tertiary' },
        ],
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero_1',
      };
    },
  },
});
