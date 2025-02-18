import React from 'react';
import { PortableTextBlock } from 'next-sanity';

export type FieldType = {
  _key: string;
  id: string;
  name: string;
  required: boolean;
  placeholder: string;
  type: 'input' | 'textArea' | 'select' | 'checkbox';
  inputType: 'text' | 'email' | 'tel' | 'number' | 'url';
  options: string[];
  enableDescription: boolean;
  description: string;
};

export type FormType = {
  _key: string;
  email: string;
  title: string;
  subject: string;
  confirmationType: 'message' | 'redirect';
  confirmationMessage: PortableTextBlock[];
  redirect: string;
  submitButtonLabel: string;
  fields: FieldType[];
};

export interface FormBuilderProps {
  form: FormType;
  uid: string;
  className?: React.HTMLAttributes<HTMLFormElement>['className'];
}

export enum STATUS_ENUM {
  NULL,
  SUBMITTING,
  SUCCESS,
  ERROR,
}

export type STATUS_TYPE = {
  TYPE: STATUS_ENUM;
  MESSAGE: string;
};

export const STATUS: STATUS_TYPE[] = [
  {
    TYPE: STATUS_ENUM.NULL,
    MESSAGE: '',
  },
  {
    TYPE: STATUS_ENUM.SUBMITTING,
    MESSAGE: 'Sending...',
  },
  {
    TYPE: STATUS_ENUM.SUCCESS,
    MESSAGE: 'Message Sent!',
  },
  {
    TYPE: STATUS_ENUM.ERROR,
    MESSAGE:
      'There seems to have been a small issue. Please refresh and try again.',
  },
];
