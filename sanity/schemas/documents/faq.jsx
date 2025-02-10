import { SealQuestion } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: SealQuestion,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Advertising', value: 'advertising' },
          { title: 'Design', value: 'design' },
          { title: 'Development', value: 'development' },
          { title: 'Consulting', value: 'consulting' },
          { title: 'Umi Flow', value: 'umi-flow' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      question: 'question',
    },
    prepare: ({ question, answer }) => ({
      title: question || 'Untitled',
    }),
  },
});
