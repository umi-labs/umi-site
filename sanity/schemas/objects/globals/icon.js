import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Eye', value: 'eye' },
          { title: 'Headphones', value: 'headphones' },
          { title: 'Clock', value: 'clock' },
          { title: 'Check', value: 'check' },
          { title: 'Check Circle', value: 'check-circle' },
          { title: 'Rocket', value: 'rocket' },
        ],
      },
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'string',
      options: {
        list: [
          { title: 'Thin', value: 'thin' },
          { title: 'Light', value: 'light' },
          { title: 'Regular', value: 'regular' },
          { title: 'Bold', value: 'bold' },
          { title: 'Duotone', value: 'duotone' },
          { title: 'Fill', value: 'fill' },
        ],
      },
    }),
  ],
});
