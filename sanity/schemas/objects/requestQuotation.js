import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'requestQuotation',
  title: 'Request Quotation',
  type: 'object',
  fields: [
    defineField({
      name: 'separator',
      title: 'Separator',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'points',
      title: 'Key Points',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'point',
          title: 'Point',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'icon',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'button',
          title: 'Button',
          type: 'button',
        }),
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{ type: 'team' }],
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
  ],
  initialValue: {
    separator: true,
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      formTitle: 'form.title',
    },
    prepare({ title, subtitle, formTitle }) {
      return {
        subtitle: subtitle ? subtitle : 'Request Quotation',
        title: title || 'Request Quotation',
      };
    },
  },
});
