import { defineType } from 'sanity';
import { ArrowCircleUp, Link } from '@phosphor-icons/react';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'External Link?',
      name: 'displayExternal',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Internal Link',
      name: 'internalLink',
      description: 'Select pages for navigation',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'post' },
        { type: 'project' },
        { type: 'team' },
        { type: 'service' },
        { type: 'review' },
        { type: 'job' },
      ],
      // Hide field if checkbox is true
      hidden: ({ parent, value }) => parent?.displayExternal,
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Use fully qualified URLS for external link',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      //
      // Hide field if checkbox is false
      hidden: ({ parent, value }) => !parent?.displayExternal,
    },
  ],
  preview: {
    select: {
      title: 'title',
      internalLink: 'internalLink.name',
      externalUrl: 'externalUrl',
      displayExternal: 'displayExternal',
    },
    prepare(selection) {
      const { displayExternal, title } = selection;
      return {
        title: title,
        // subtitle: externalUrl,
        // ! FIX:
        media: displayExternal ? ArrowCircleUp : Link,
      };
    },
  },
});
