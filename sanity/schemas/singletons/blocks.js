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
    defineArrayMember({
      name: 'formBuilder',
      type: 'formBuilder',
    }),
    defineArrayMember({
      name: 'hero1',
      type: 'hero1',
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
  ],
});
