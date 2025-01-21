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
      name: 'featureGrid',
      type: 'featureGrid',
    }),
    defineArrayMember({
      name: 'faq',
      type: 'faq',
    }),
    defineArrayMember({ name: 'jobVacancies', type: 'jobVacancies' }),
    defineArrayMember({
      name: 'contentBlock',
      type: 'contentBlock',
    }),
    defineArrayMember({
      name: 'meetTheTeam',
      type: 'meetTheTeam',
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
      name: 'carousel',
      type: 'carousel',
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
      name: 'portfolioFullWidth',
      type: 'portfolioFullWidth',
    }),
    defineArrayMember({
      name: 'alternatingContent',
      type: 'alternatingContent',
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
    defineArrayMember({
      name: 'archiveBlock',
      type: 'archiveBlock',
    }),
  ],
});
