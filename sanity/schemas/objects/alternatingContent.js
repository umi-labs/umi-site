import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'alternatingContent',
  title: 'AlternatingContent',
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
        title: 'AlternatingContent',
      };
    },
  },
});
