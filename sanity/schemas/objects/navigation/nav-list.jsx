import { defineType } from 'sanity';
import { List } from '@phosphor-icons/react';

export default defineType({
  name: 'navList',
  title: 'Nav Item',
  type: 'object',
  icon: List,
  fields: [
    {
      name: 'detailedSubMenu',
      title: 'Detailed Sub Menu?',
      type: 'boolean',
      description:
        'Choose this if you want the option of a sub Menu link and sub items to have an image',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'subMenuCaption',
      title: 'Caption',
      type: 'string',
      hidden: ({ parent }) => !parent?.detailedSubMenu,
    },
    {
      name: 'subMenuLink',
      title: 'Link',
      type: 'navItem',
      hidden: ({ parent }) => !parent?.detailedSubMenu,
    },
    {
      name: 'items',
      title: 'Nav items',
      type: 'array',
      of: [{ type: 'navItem' }],
    },
  ],
});
