import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      description:
        'Video file for the video - allowed formats: mp4, webm, mpeg',
      type: 'file',
      options: {
        accept: ['video/mp4', 'video/webm', 'video/mpeg'],
      },
    }),
    defineField({
      name: 'image',
      title: 'Backup Image',
      description: 'Backup image for the video',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'controls',
      title: 'Controls',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'playsinline',
      title: 'Plays Inline',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  initialValue: {
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
    playsinline: true,
  },
});
