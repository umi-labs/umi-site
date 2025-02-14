import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'policies',
  title: 'Policies',
  type: 'array',
  description: 'Links to policies that are displayed on the footer.',
  of: [
    defineField({
      type: 'link',
      name: 'policy',
      title: 'Policy',
    }),
  ],
});
