import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'layout',
  title: 'Layout',
  type: 'object',
  fields: [
    defineField({
      name: 'justify',
      title: 'Justify',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'normal' },
          { title: 'Center', value: 'center' },
          { title: 'Start', value: 'start' },
          { title: 'End', value: 'end' },
          { title: 'Stretch', value: 'stretch' },
          { title: 'Space Between', value: 'between' },
          { title: 'Space Around', value: 'around' },
          { title: 'Space Evenly', value: 'evenly' },
        ],
      },
    }),
    defineField({
      name: 'align',
      title: 'Align',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Start', value: 'start' },
          { title: 'End', value: 'end' },
          { title: 'Baseline', value: 'baseline' },
          { title: 'Stretch', value: 'stretch' },
        ],
      },
    }),
    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'Accent', value: 'accent' },
        ],
      },
    }),
  ],
  initialValue: {
    justify: 'center',
    align: 'center',
    colour: 'light',
  },
});
