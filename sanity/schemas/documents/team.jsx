import { Users } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  icon: Users,
  groups: [
    {
      name: 'details',
      title: 'Details',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      description: 'The name of the person',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'The Board', value: 'board' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Development', value: 'development' },
          { title: 'Design', value: 'design' },
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'details',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social Link',
          type: 'socialMedia',
        }),
      ],
      group: 'details',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
  ],
  select: {
    title: 'name',
  },
  prepare({ title }) {
    return {
      title,
    };
  },
});
