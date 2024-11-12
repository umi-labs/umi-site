import { defineType } from 'sanity';
import { ListPlus } from '@phosphor-icons/react';

export default defineType({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  icon: ListPlus,
  fields: [
    {
      name: 'name',
      title: 'Nav Text',
      type: 'string',
    },
    {
      name: 'navItemUrl',
      title: 'Nav Item URL',
      type: 'link',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
});
