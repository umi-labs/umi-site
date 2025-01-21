import { ChatCenteredText } from '@phosphor-icons/react/dist/ssr';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: ChatCenteredText,
  fields: [
    defineField({
      name: 'name',
      description: 'The name of the person',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'position', title: 'Position', type: 'string' }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
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
