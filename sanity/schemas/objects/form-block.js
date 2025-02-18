import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'formBlock',
  title: 'Form Block',
  type: 'object',
  fields: [
    defineField({
      name: 'enableIntro',
      title: 'Enable Intro',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'introContent',
      title: 'Intro Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => !parent?.enableIntro,
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || 'No subtitle provided',
      };
    },
  },
});
