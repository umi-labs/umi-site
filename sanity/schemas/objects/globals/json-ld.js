import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'jsonLd',
  title: 'JSON-LD',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Website', value: 'website' },
          { title: 'Profile', value: 'profile' },
          { title: 'Event', value: 'event' },
          { title: 'Organization', value: 'organization' },
          { title: 'LocalBusiness', value: 'localBusiness' },
          { title: 'Product', value: 'product' },
          { title: 'Service', value: 'service' },
        ],
      },
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'service',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
});
