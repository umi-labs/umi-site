import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'blocks',
  title: 'blocks',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'imageWithText',
      type: 'imageWithText',
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
    }),
    defineArrayMember({
      name: 'contactFormBlock',
      type: 'contactFormBlock',
    }),
    defineArrayMember({
      name: 'ctaSimple',
      type: 'ctaSimple',
    }),
    defineArrayMember({
      name: 'ctaTitleImage',
      type: 'ctaTitleImage',
    }),
    defineArrayMember({
      name: 'ctaWithForm',
      type: 'ctaWithForm',
    }),
    defineArrayMember({
      name: 'heroWithMedia',
      type: 'heroWithMedia',
    }),
    defineArrayMember({
      name: 'cardGridSideTitle',
      type: 'cardGridSideTitle',
    }),
    defineArrayMember({
      name: 'cardGridSideTitleSimple',
      type: 'cardGridSideTitleSimple',
    }),
    defineArrayMember({
      name: 'testimonialsCarousel',
      type: 'testimonialsCarousel',
    }),
    defineArrayMember({
      name: 'logoCloud',
      type: 'logoCloud',
    }),
    defineArrayMember({
      name: 'blogGrid',
      type: 'blogGrid',
    }),
  ],
});
