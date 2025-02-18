import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'formFields',
  title: 'Form Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      options: {
        source: (doc, options) => options.parent?.fieldName,
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'text',
      options: {
        layout: 'dropdown',
        list: [
          { value: 'input', title: 'Input' },
          { value: 'textArea', title: 'Text area' },
          { value: 'select', title: 'Select' },
          { value: 'checkbox', title: 'Checkbox' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.type !== 'select',
    }),
    defineField({
      name: 'inputType',
      title: 'Input Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { value: 'text', title: 'Text' },
          { value: 'email', title: 'Email' },
          { value: 'tel', title: 'Phone number' },
          { value: 'number', title: 'Number' },
          { value: 'url', title: 'Url' },
        ],
      },
      hidden: ({ parent }) => parent?.type !== 'input',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'enableDescription',
      title: 'Enable Description',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      hidden: ({ parent }) => !parent?.enableDescription,
    }),
  ],
});
