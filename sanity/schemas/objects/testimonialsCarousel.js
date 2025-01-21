import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonialsCarousel',
  title: 'Testimonials Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'separator',
      title: 'Separator',
      type: 'boolean',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Testimonials',
      };
    },
  },
});
