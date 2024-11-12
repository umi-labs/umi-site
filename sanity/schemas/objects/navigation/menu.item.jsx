import { defineField, defineType } from 'sanity';
import { ListPlus } from '@phosphor-icons/react';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  icon: ListPlus,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayList',
      title: 'Nav List?',
      type: 'boolean',
      description:
        'Choose this if you need navigation within a parent e.g., England > Counties, NOTE: This will only display on Main / Footer Menus',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    }),
    {
      name: 'itemsList',
      type: 'navList',
      title: 'Nav List',
      hidden: ({ parent }) => !parent?.displayList,
    },
    {
      name: 'items',
      type: 'navItem',
      title: 'Nav Item',
      hidden: ({ parent }) => parent?.displayList,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Menu Item',
      };
    },
  },
});
