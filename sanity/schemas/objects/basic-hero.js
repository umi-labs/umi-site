import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'basicHero',
  title: 'Basic Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'separator',
      title: 'Separator',
      type: 'boolean',
      default: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
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
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title ? title : 'Basic Hero',
      };
    },
  },
});
