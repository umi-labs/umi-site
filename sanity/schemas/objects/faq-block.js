import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    defineField({
      type: 'boolean',
      name: 'separator',
      title: 'Separator',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'manual',
      title: 'Choose Manually?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'reference', title: 'FAQ', to: [{ type: 'faq' }] }],
      hidden: ({ parent }) => !parent.manual,
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
