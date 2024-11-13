import { Graph } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialMedia',
  title: 'Social Media',
  type: 'document',
  icon: Graph,
  fields: [
    defineField({ type: 'string', name: 'title', title: 'Title' }),
    defineField({
      type: 'string',
      name: 'socialMedia',
      title: 'Social Media',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Youtube', value: 'youtube' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'Apple Podcasts', value: 'apple_podcasts' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Spotify', value: 'spotify' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      type: 'string',
      name: 'fillType',
      title: 'Fill Type',
      options: {
        list: [
          { title: 'Thin', value: 'thin' },
          { title: 'Light', value: 'light' },
          { title: 'Regular', value: 'regular' },
          { title: 'Bold', value: 'bold' },
          { title: 'Fill', value: 'fill' },
          { title: 'Duotone', value: 'duotone' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      type: 'url',
      name: 'link',
      title: 'Link',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
