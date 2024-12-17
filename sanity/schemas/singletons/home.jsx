import { House } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: House,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      description: 'This is the hero component for the home page',
      title: 'Hero',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'primaryHero',
          type: 'primaryHero',
        }),
        defineArrayMember({
          name: 'heroWithMedia',
          type: 'heroWithMedia',
        }),
        defineArrayMember({
          name: 'heroImageOverlap',
          type: 'heroImageOverlap',
        }),
      ],
      validation: (rule) => rule.required().max(1),
    }),
    defineField({
      name: 'blocks',
      description: 'Used to add components to the home page',
      title: 'Blocks',
      type: 'blocks',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      };
    },
  },
});
