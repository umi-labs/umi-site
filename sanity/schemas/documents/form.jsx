import { Table } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  icon: Table,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formFields' }],
    }),
    defineField({
      name: 'formSubmission',
      title: 'Form Submission',
      description:
        'Choose whether you want to send the form to an inbox or email (there are currently some issues with the submission functionality that is being worked on).',
      type: 'string',
      options: {
        list: [
          { title: 'Inbox', value: 'inbox' },
          { title: 'Email', value: 'email' },
        ],
      },
      defaultValue: 'inbox',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      hidden: ({ parent }) => parent?.formSubmission !== 'email',
    }),
    defineField({
      name: 'inbox',
      title: 'Inbox',
      type: 'reference',
      to: [{ type: 'inbox' }],
      hidden: ({ parent }) => parent?.formSubmission !== 'inbox',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
    }),
  },
});
