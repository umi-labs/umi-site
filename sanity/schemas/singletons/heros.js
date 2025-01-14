import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'heros',
  title: 'Heros',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'heroWithMedia',
      type: 'heroWithMedia',
    }),
    defineArrayMember({
      name: 'archiveBlock',
      type: 'archiveBlock',
    }),
    defineArrayMember({
      name: 'meetTheTeam',
      type: 'meetTheTeam',
    }),
    defineArrayMember({
      name: 'heroImageOverlap',
      type: 'heroImageOverlap',
    }),
  ],
  validation: (rule) => rule.max(1),
});
