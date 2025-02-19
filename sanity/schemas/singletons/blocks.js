import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'blocks',
  title: 'blocks',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'imageWithText',
      type: 'imageWithText',
    }),
    defineArrayMember({
      name: 'textBlock',
      type: 'textBlock',
    }),
    defineArrayMember({
      name: 'formBlock',
      type: 'formBlock',
    }),
    // TODO: Fix this
    // defineArrayMember({
    //   name: 'cta',
    //   type: 'cta',
    // }),
    defineArrayMember({
      name: 'contactFormBlock',
      type: 'contactFormBlock',
    }),
    defineArrayMember({ name: 'ctaBlock', type: 'ctaBlock' }),
    defineArrayMember({
      name: 'featureGrid',
      type: 'featureGrid',
    }),
    defineArrayMember({
      name: 'faqBlock',
      title: 'FAQ Block',
      type: 'faqBlock',
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
