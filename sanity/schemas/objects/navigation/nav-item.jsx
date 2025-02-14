import { defineField, defineType } from 'sanity';
import { ListPlus } from '@phosphor-icons/react';

export default defineType({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  icon: ListPlus,
  fields: [
    defineField({
      type: 'boolean',
      name: 'detailedSubItem',
      title: 'Detailed Sub Item',
      defaultValue: false,
    }),
    defineField({
      type: 'text',
      name: 'subItemDescription',
      title: 'Sub Item Description',
      hidden: ({ parent }) => parent?.detailedSubItem !== true,
    }),
    defineField({ type: 'link', name: 'link', title: 'Link' }),
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
