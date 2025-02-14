import { defineArrayMember, defineField, defineType } from 'sanity';
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
      name: 'subNavigation',
      title: 'Does this need sub navigation item?',
      type: 'string',
      description:
        'Choose this if you need navigation within a parent e.g., England > Counties, NOTE: This will only display on Main / Footer Menus',
      initialValue: 'none',
      options: {
        list: [
          {
            title: 'None',
            value: 'none',
          },
          {
            title: 'Manual',
            value: 'manual',
          },
          {
            title: 'Collection',
            value: 'collection',
          },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'detailedList',
      title: 'Detailed List',
      type: 'boolean',
      description: 'Displays a description for sub navigation',
      defaultValue: false,
      hidden: ({ parent }) => parent?.subNavigation === 'none',
    }),
    defineField({
      name: 'detailedItemsList',
      type: 'array',
      title: 'Nav List',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            defineField({
              type: 'text',
              name: 'subItemDescription',
              title: 'Sub Item Description',
            }),
            defineField({ type: 'link', name: 'link', title: 'Link' }),
          ],
          preview: {
            select: {
              link: 'link',
            },
            prepare({ link }) {
              return {
                title: link.title,
                subtitle: 'Menu Item',
              };
            },
          },
        }),
      ],
      hidden: ({ parent }) =>
        parent?.subNavigation !== 'manual' || parent?.detailedList !== true,
    }),
    defineField({
      name: 'itemsList',
      type: 'array',
      title: 'Nav List',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [defineField({ type: 'link', name: 'link', title: 'Link' })],
          preview: {
            select: {
              link: 'link',
            },
            prepare({ link }) {
              return {
                title: link.title,
                subtitle: 'Menu Item',
              };
            },
          },
        }),
      ],
      hidden: ({ parent }) =>
        parent?.subNavigation !== 'manual' || parent?.detailedList === true,
    }),
    defineField({
      name: 'collection',
      type: 'string',
      title: 'Collection',
      description: 'Select a collection to display',
      options: {
        list: [
          { title: 'Pages', value: 'page' },
          { title: 'Posts', value: 'post' },
          { title: 'Projects', value: 'project' },
          { title: 'Services', value: 'service' },
        ],
      },
      hidden: ({ parent }) => parent?.subNavigation !== 'collection',
    }),
    defineField({
      name: 'items',
      type: 'link',
      title: 'Nav Item',
      hidden: ({ parent }) => parent?.subNavigation !== 'none',
    }),
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
