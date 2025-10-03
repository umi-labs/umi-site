import { defineType } from 'sanity';

export default defineType({
  name: 'requestQuotation',
  title: 'Request Quotation',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'separator',
      title: 'Show Separator',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'points',
      title: 'Key Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Check', value: 'check' },
                      { title: 'Check Circle', value: 'check-circle' },
                      { title: 'Eye', value: 'eye' },
                      { title: 'Rocket', value: 'rocket' },
                      { title: 'Clock', value: 'clock' },
                      { title: 'Headphones', value: 'headphones' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'weight',
                  title: 'Icon Weight',
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
                  initialValue: 'regular',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Button Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                {
                  name: 'href',
                  title: 'External URL',
                  type: 'url',
                },
                {
                  name: 'internalLink',
                  title: 'Internal Link',
                  type: 'reference',
                  to: [
                    { type: 'page' },
                    { type: 'project' },
                    { type: 'service' },
                    { type: 'post' },
                    { type: 'team' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{ type: 'team' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Request Quotation',
        subtitle: subtitle,
      };
    },
  },
});
