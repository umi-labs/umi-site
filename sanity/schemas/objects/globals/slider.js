import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'slider',
  title: 'Slider',
  type: 'object',
  fields: [
    defineField({
      name: 'data',
      title: 'Data',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Slider',
      };
    },
  },
});
