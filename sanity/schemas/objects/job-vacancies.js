import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'jobVacancies',
  title: 'Job Vacancies',
  type: 'object',
  fields: [
    defineField({
      name: 'separator',
      title: 'Separator',
      type: 'boolean',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
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
