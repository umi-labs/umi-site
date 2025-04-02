import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
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
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    },
  
  ],
  preview: {
    prepare() {
      return {
        title: `Text Block`,
      };
    },
  },
});
