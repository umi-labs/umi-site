import { groq } from 'next-sanity';

export const form = groq`
  form-> {
    _id,
    title,
    email,
    "subject": subjectLine,
    confirmationType,
    confirmationMessage,
    redirect,
    "fields": formFields[]{
      _key,
      "id": id.current,
      name,
      placeholder,
      required,
      type,
      inputType,
      options,
      enableDescription,
      description
    },
  }
`;
