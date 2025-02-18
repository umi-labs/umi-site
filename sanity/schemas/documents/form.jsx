import { Table } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  icon: Table,
  groups: [
    {
      name: 'fields',
      title: 'Fields',
    },
    {
      name: 'submission',
      title: 'Submission',
    },
    {
      name: 'misc',
      title: 'MISC',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'misc',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formFields' }],
      group: 'fields',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      description:
        'The email address that the form submissions will be sent to.',
      type: 'string',
      validation: (Rule) => Rule.email(),
      group: 'submission',
    }),
    defineField({
      name: 'subjectLine',
      title: 'Subject Line',
      description: 'The subject line of the email.',
      type: 'string',
      group: 'submission',
    }),
    defineField({
      name: 'confirmationType',
      title: 'Confirmation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Message', value: 'message' },
          { title: 'Redirect', value: 'redirect' },
        ],
      },
      defaultValue: 'message',
      group: 'submission',
    }),
    defineField({
      name: 'confirmationMessage',
      title: 'Confirmation Message',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'The message that will be displayed on submission confirmation.',
      hidden: ({ parent }) => parent?.confirmationType !== 'message',
      group: 'submission',
    }),
    defineField({
      name: 'redirect',
      title: 'Confirmation Redirect',
      type: 'string',
      description:
        'The URL that will be redirected to on submission confirmation.',
      hidden: ({ parent }) => parent?.confirmationType !== 'redirect',
      group: 'submission',
    }),
    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      description: 'The label that will be displayed on the submit button.',
      group: 'submission',
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
