import { defineArrayMember, defineField, defineType } from 'sanity';
import { Gear } from '@phosphor-icons/react';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Gear,
  groups: [
    {
      name: 'navbar',
      title: 'Navbar',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'social',
      title: 'Social',
    },
    {
      name: 'misc',
      title: 'MISC',
    },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'mainNav',
      title: 'Main Nav',
      description: 'Main navigation list displayed on the header of your site.',
      type: 'reference',
      to: [
        {
          type: 'navigation',
          validation: (Rule) => Rule.unique(),
        },
      ],
      group: 'navbar',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      description: 'Copyright Text displayed on the footer of your site.',
      type: 'text',
      group: 'footer',
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer Nav',
      description:
        'Secondary navigation list displayed on the footer of your site.',
      type: 'reference',
      to: [
        {
          type: 'navigation',
          validation: (Rule) => Rule.unique(),
        },
      ],
      group: 'footer',
    }),
    defineField({
      name: 'sponsors',
      title: 'Sponsors',
      type: 'array',
      description: 'Links to sponsors that are displayed on the footer.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sponsor',
          title: 'Sponsor',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'link',
              type: 'url',
              title: 'Link',
              validation: (rule) =>
                rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
            }),
          ],
        }),
      ],
      group: 'misc',
    }),
    defineField({
      name: 'policies',
      title: 'Policies',
      type: 'array',
      of: [{ type: 'link' }],
      group: 'misc',
    }),
    defineField({
      name: 'customCursor',
      title: 'Custom Cursor',
      type: 'boolean',
      description: 'If true, the custom cursor will be displayed.',
      initialValue: false,
      group: 'misc',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      description: 'Social media links associated with the site.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'socialMedia',
          name: 'socialLink',
          title: 'Social Link',
        }),
      ],
      group: 'social',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
      description: 'Contact details associated with the site.',
      type: 'object',
      fields: [
        defineField({
          type: 'string',
          name: 'email',
          title: 'Email',
        }),
        defineField({
          type: 'string',
          name: 'phone',
          title: 'Phone',
        }),
        defineField({
          type: 'array',
          name: 'addresses',
          title: 'Addresses',
          of: [
            {
              type: 'object',
              name: 'address',
              title: 'Address',
              fields: [
                defineField({
                  type: 'string',
                  name: 'street',
                  title: 'Street',
                }),
                defineField({
                  type: 'string',
                  name: 'city',
                  title: 'City',
                }),
                defineField({
                  type: 'string',
                  name: 'state',
                  title: 'State',
                }),
                defineField({
                  type: 'string',
                  name: 'zip',
                  title: 'Zip',
                }),
              ],
            },
          ],
        }),
      ],
      group: 'misc',
    }),
  ],
});
