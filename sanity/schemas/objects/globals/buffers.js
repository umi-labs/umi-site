import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'buffers',
  title: 'Buffers',
  type: 'object',
  fields: [
    defineField({
      name: 'top',
      title: 'Top',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'bottom',
      title: 'Bottom',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
