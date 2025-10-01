import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'column',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'width',
              title: 'Width',
              type: 'string',
              options: {
                list: [
                  { value: 'full', title: 'Full' },
                  { value: 'half', title: 'Half' },
                  { value: 'oneThird', title: 'One Third' },
                  { value: 'twoThirds', title: 'Two Thirds' },
                  { value: 'oneQuarter', title: 'One Quarter' },
                  { value: 'threeQuarters', title: 'Three Quarters' },
                ],
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                { type: 'block' },
                {
                  type: 'image',
                },
              ],
            }),
          ],
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
        subtitle: 'CTA',
      };
    },
  },
});
